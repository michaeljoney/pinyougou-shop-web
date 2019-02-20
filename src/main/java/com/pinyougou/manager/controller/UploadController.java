package com.pinyougou.manager.controller;

import util.FastDFSClient;
import entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


/********
 * author:Aligan
 * date2018/9/26 20:49
 * description:Aligan
 * version:1.0
 ******/

@RestController
public class UploadController {

    @Value("${FILE_SERVER_URL}")
    private String fileServerUrl;

    @RequestMapping("/uploadFile")
    public Result uploadFile(MultipartFile file){
        System.out.println("测试点1");
        //1、取文件的扩展名
        String originalFilename = file.getOriginalFilename();
        String exename = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        // 2、创建一个 FastDFS 的客户端
        try {
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
            // 3、执行上传处理
            String path = fastDFSClient.uploadFile(file.getBytes(), exename);//将文件转换成二进制字节数组加上后缀名
            //4、拼接返回的 url 和 ip 地址，拼装成完整的 url
            String url=fileServerUrl+path;
            System.out.println("测试点2");
            return new Result(true,url);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"上传失败");
        }
    }

}
