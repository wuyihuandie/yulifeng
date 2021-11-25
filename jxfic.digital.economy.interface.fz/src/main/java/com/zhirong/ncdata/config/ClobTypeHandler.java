package com.zhirong.ncdata.config;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.io.BufferedReader;
import java.io.Reader;
import java.sql.*;

public class ClobTypeHandler extends BaseTypeHandler<Object> {

    @Override
    public Object getNullableResult(ResultSet rs, String columnName) throws SQLException {
        try {
            if(rs.getObject(columnName).getClass().getName()!=null && (rs.getObject(columnName).getClass().getName().equals("com.alibaba.druid.proxy.jdbc.NClobProxyImpl")||rs.getObject(columnName).getClass().getName().equals("oracle.sql.CLOB")||rs.getObject(columnName).getClass().getName().equals("com.alibaba.druid.proxy.jdbc.ClobProxyImpl"))){
                return ClobToString(rs.getClob(columnName));
            }
            return rs.getObject(columnName);
        } catch (Exception e) {
            return "";
        }
    }
    public Object getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return rs.getObject(columnIndex);
    }


    public Object getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return cs.getString(columnIndex);
    }

    public static String ClobToString(Clob clob){
        try {
            String reString = "";
            Reader is = clob.getCharacterStream();// 得到流
            BufferedReader br = new BufferedReader(is);
            String s = br.readLine();
            StringBuffer sb = new StringBuffer();
            while (s != null) {// 执行循环将字符串全部取出付值给StringBuffer由StringBuffer转成STRING
                sb.append(s);
                s = br.readLine();
            }
            reString = sb.toString();
            return reString;
        } catch (Exception e) {
            return null;
        }

    }

    public void setNonNullParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
        ps.setObject(i, parameter);
    }

}
