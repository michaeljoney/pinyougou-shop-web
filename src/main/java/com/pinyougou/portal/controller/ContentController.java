package com.pinyougou.portal.controller;


import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.content.service.ContentService;
import com.pinyougou.pojo.TbContent;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/********
 * author:Aligan
 * date2018/10/3 16:37
 * description:Aligan
 * version:1.0
 ******/

@RestController
@RequestMapping("/content")
public class ContentController {

    @Reference
    private ContentService contentService;

    //根据分类广告查询
    @RequestMapping("/findByCategoryId")
    public List<TbContent> findByCategoryId(Long categoryId){
        return  contentService.findByCategoryId(categoryId);
    }
}
