package com.zhirong.ncdata.utils;


public class MeiJu {

    public static void main(String[]args) {
        System.out.println(Trantype.getName("sxdt"));
    }


    public enum Trantype {
        T01("要闻", "yw"), T02("工作动态","gslgz"), T03("工作动态", "sxdt"), T04("工作动态", "shjs"),
        T05("工作动态","hyqy"),T06("扶贫光彩事业","fpgcsy"),T07("图片新闻","tpxw");
        // 成员变量
        private String name;
        private String index;

        // 构造方法
        private Trantype(String name, String index) {
            this.name = name;
            this.index = index;
        }

        // 普通方法
        public static String getName(String index) {
            for (Trantype c : Trantype.values()) {
                if (c.getIndex().equals(index)) {
                    return c.name;
                }
            }
            return null;
        }

        // get set 方法
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getIndex() {
            return index;
        }

        public void setIndex(String index) {
            this.index = index;
        }

        // 覆盖方法
        @Override
        public String toString() {
            return this.index + "_" + this.name;
        }
    }

}
