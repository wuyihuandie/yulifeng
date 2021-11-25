package com.zhirong.ncdata.utils;


public class EncryptPwdUtil {
	public static String doEncryptPwd(String pwd) {
		String newpwd = "";
		try {
			DesCrypt dc = new DesCrypt();
			newpwd = dc.encrypt(pwd);
			newpwd = dc.encrypt(newpwd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newpwd;
	}

	public static String doDecryptPwd(String pwd) {
		String oldpwd = "";
		try {
			DesCrypt dc = new DesCrypt();
			oldpwd = dc.decrypt(pwd);
			oldpwd = dc.decrypt(oldpwd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return oldpwd;
	}

	public static void main(String[] args) {
		System.out.println("======"+doEncryptPwd("a123456"));
	}



/*	public static void main(String[] args) {//f0f6d16d0dda7c6a74f653149d94ac976e8662b6d7f37c27
		System.out.println(doEncryptPwd("1"));
		System.out.println(doDecryptPwd("f0f6d16d0dda7c6a74f653149d94ac976e8662b6d7f37c27"));
	}*/

}
