package com.bupt.sse.adminManage.dao.common;

/**
 * Created by WenFe on 2017/3/15.
 */
import java.io.Serializable;
import java.util.List;

/**
 * Created by WenFeng on 2017/3/15.
 */
public interface BaseDao<T> {

    public boolean create(T entity);

    public T update(T entity);

    public void deleteById(Serializable id);

    public List<T> list();

    public T getById(Serializable id);

    public List<T> findByHQL(String hql, Object... params);

}
