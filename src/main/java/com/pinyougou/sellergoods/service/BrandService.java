package com.pinyougou.sellergoods.service;


import com.pinyougou.pojo.TbBrand;
import entity.PageResult;

import java.util.List;
import java.util.Map;

/**
 *
 * 品牌服务层接口
 *
 *
 * */

public interface BrandService {
    //返回全部列表
    public List<TbBrand> findAll();


    //返回分页列表
    public PageResult findPage(int pageNum,int pageSize);


    /**
     * 增加
     */
    public void add(TbBrand brand);


    /**
     * 修改
     *
     * */
    public void update(TbBrand brand);

    /**
     * 根据ID获取实体
     * */

    public TbBrand findOne(Long id);

    /**
     * 批量删除
     */
    public void delete(Long [] ids);

    /**
     * 分页
     *
     */
    public PageResult findPage(TbBrand brand, int pageNum,int pageSize);



    /**
     * 返回品牌下拉框数据
     */
     public List<Map> selectOptionList();


}
