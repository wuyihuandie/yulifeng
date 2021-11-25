package com.zhirong.ncdata.utils;

import org.apache.log4j.Logger;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;

public class FileUtil {

    protected static Logger logger = Logger.getLogger(FileUtil.class);

    /**
     * 创建目录
     *
     * @param destDirName
     *            目标目录名
     * @return 目录创建成功返回true，否则返回false
     */
    public static boolean createDir(String destDirName) {
        File dir = new File(destDirName);
        if (dir.exists()) {
            return false;
        }
        if (!destDirName.endsWith(File.separator)) {
            destDirName = destDirName + File.separator;
        }
        // 创建单个目录
        if (dir.mkdirs()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除文件
     *
     * @param filePathAndName
     *            String 文件路径及名称 如c:/fqf.txt
     * @return boolean
     */
    public static void delFile(String filePathAndName) {
        try {
            String filePath = filePathAndName;
            //filePath = filePath.toString();
            File myDelFile = new File(filePath);
            boolean galg=myDelFile.delete();
            if(galg){}

        } catch (Exception e) {
            System.out.println("删除文件操作出错");
            logger.error(e.toString(),e);

        }

    }



    /**
     * @param folderPath 文件路径 (只删除此路径的最末路径下所有文件和文件夹)
     */
    public static void delFolder(String folderPath) {
        try {
            delAllFile(folderPath);     // 删除完里面所有内容
            String filePath = folderPath;
            //filePath = filePath.toString();
            File myFilePath = new File(filePath);
            boolean galg=myFilePath.delete();        // 删除空文件夹
            if(galg){}

        } catch (Exception e) {
            logger.error(e.toString(),e);
        }
    }

    /**
     * 删除指定文件夹下所有文件
     * @param path 文件夹完整绝对路径
     */
    public static boolean delAllFile(String path) {
        boolean flag = false;
        File file = new File(path);
        if (!file.exists()) {
            return flag;
        }
        if (!file.isDirectory()) {
            return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
            if (path.endsWith(File.separator)) {
                temp = new File(path + tempList[i]);
            } else {
                temp = new File(path + File.separator + tempList[i]);
            }
            if (temp.isFile()) {
                boolean ga=temp.delete();
                if(ga){}
            }
            if (temp.isDirectory()) {
                delAllFile(path + "/" + tempList[i]);   // 先删除文件夹里面的文件
                delFolder(path + "/" + tempList[i]);    // 再删除空文件夹
                flag = true;
            }
        }
        return flag;
    }

    /**
     * 读取到字节数组0
     *
     * @param filePath //路径
     * @throws IOException
     */
    @SuppressWarnings("resource")
    public static byte[] getContent(String filePath) throws IOException {
        File file = new File(filePath);
        long fileSize = file.length();
        if (fileSize > Integer.MAX_VALUE) {
            System.out.println("file too big...");
            return null;
        }
        FileInputStream fi = new FileInputStream(file);
        byte[] buffer = new byte[(int) fileSize];
        int offset = 0;
        int numRead = 0;
        while (offset < buffer.length
                && (numRead = fi.read(buffer, offset, buffer.length - offset)) >= 0) {
            offset += numRead;
        }
        // 确保所有数据均被读取
        if (offset != buffer.length) {
            throw new IOException("Could not completely read file "+ file.getName());
        }
        fi.close();
        return buffer;
    }

    /**
     * 读取到字节数组1
     *
     * @param filePath
     * @return
     * @throws IOException
     */
    public static byte[] toByteArray(String filePath) throws IOException {

        File f = new File(filePath);
        if (!f.exists()) {
            throw new FileNotFoundException(filePath);
        }
        ByteArrayOutputStream bos = new ByteArrayOutputStream((int) f.length());
        BufferedInputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(f));
            int buf_size = 1024;
            byte[] buffer = new byte[buf_size];
            int len = 0;
            while (-1 != (len = in.read(buffer, 0, buf_size))) {
                bos.write(buffer, 0, len);
            }
            return bos.toByteArray();
        } catch (IOException e) {
            logger.error(e.toString(),e);
            throw e;
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                logger.error(e.toString(),e);
            }
            bos.close();
        }
    }

    /**
     * 读取到字节数组2
     *
     * @param filePath
     * @return
     * @throws IOException
     */
    public static byte[] toByteArray2(String filePath) throws IOException {

        File f = new File(filePath);
        if (!f.exists()) {
            throw new FileNotFoundException(filePath);
        }

        FileChannel channel = null;
        FileInputStream fs = null;
        try {
            fs = new FileInputStream(f);
            channel = fs.getChannel();
            ByteBuffer byteBuffer = ByteBuffer.allocate((int) channel.size());
            while ((channel.read(byteBuffer)) > 0) {
                // do nothing
                // System.out.println("reading");
            }
            return byteBuffer.array();
        } catch (IOException e) {
            logger.error(e.toString(),e);
            throw e;
        } finally {
            try {
                channel.close();
            } catch (IOException e) {
                logger.error(e.toString(),e);
            }
            try {
                fs.close();
            } catch (IOException e) {
                logger.error(e.toString(),e);
            }
        }
    }

    /**
     * Mapped File way MappedByteBuffer 可以在处理大文件时，提升性能
     *
     * @param filePath
     * @return
     * @throws IOException
     */
    public static byte[] toByteArray3(String filePath) throws IOException {

        FileChannel fc = null;
        RandomAccessFile rf = null;
        try {
            rf = new RandomAccessFile(filePath, "r");
            fc = rf.getChannel();
            MappedByteBuffer byteBuffer = fc.map(FileChannel.MapMode.READ_ONLY, 0,
                    fc.size()).load();
            //System.out.println(byteBuffer.isLoaded());
            byte[] result = new byte[(int) fc.size()];
            if (byteBuffer.remaining() > 0) {
                // System.out.println("remain");
                byteBuffer.get(result, 0, byteBuffer.remaining());
            }
            return result;
        } catch (IOException e) {
            logger.error(e.toString(),e);
            throw e;
        } finally {
            try {
                rf.close();
                fc.close();
            } catch (IOException e) {
                logger.error(e.toString(),e);
            }
        }
    }

    /**
     *
     * @descript (得到目录下面的所有文件)
     * @author 李海涛
     * @since 2016年9月18日下午1:01:22
     * @param filePath
     * @return
     */
    public static ArrayList<String> getFiles(String filePath) {
        ArrayList<String> fileList = new ArrayList<String>();
        File root = new File(filePath);
        File[] files = root.listFiles();
        for (File file : files) {
            if (!file.isDirectory()) {
                /*
                 * 递归调用
                 */
                String picPathStr = file.getName();
                fileList.add(picPathStr);
            }
        }
        return fileList;
    }

    /**
     *
     * @descript (保存文件)
     * @author 李海涛
     * @since 2016年9月20日下午2:03:50
     * @param stream 文件流
     * @param path 文件夹路径
     * @param filename 文件名称
     * @return
     */
    public static boolean saveFileFromInputStream(InputStream stream, String path, String filename)  {
        File f = new File(path);
        if(!f.exists()){
            //当路径不存在就创建一个路径
            f.mkdirs();
        }
        FileOutputStream fs =null;
        try {
            //文件路径
            File file = new File(path + File.separator + filename);
            fs   = new FileOutputStream(file);
            byte[] buffer = new byte[1024 * 1024];
            int byteread = 0;
            while ((byteread = stream.read(buffer)) != -1) {
                fs.write(buffer, 0, byteread);
                fs.flush();
            }
        } catch (Exception e) {
            logger.error(e.toString(),e);
            return false;
        }finally {
            try {
                fs.close();
                stream.close();
            } catch (Exception e2) {
                return false;
            }
        }
        return true;
    }

    /**
     *
     * @descript 文件下载
     * @author 龚志强
     * @since 2016年9月27日上午9:48:50
     * @param codePath
     * @param response
     * @param fileName
     * @return
     * @throws Exception
     */
    public static boolean upload(HttpServletResponse response, String codePath, String fileName) throws Exception{
        //根据文件名称获取文件，写出输入流
        File file = new File(codePath);
        FileInputStream is = null;
        ServletOutputStream out = null;

        if(file.exists()){
            try {
                response.reset();
                response.setHeader("Content-Disposition","attachment; filename=" + new String(fileName.getBytes("UTF-8"), "iso-8859-1"));
                response.addHeader("Content-Length", "" + file.length());
                response.setContentType("application/octet-stream;charset=UTF-8");
                //读取文件
                is = new FileInputStream(file);
                //获取输出流，写入文件
                out = response.getOutputStream();
                byte[] b = new byte[1024];
                int len = -1;

                while ((len = is.read(b)) != -1) {
                    out.write(b, 0, len);
                }
                return true;
            } catch (Exception ex) {
                return false;
            } finally {
                out.close();
                is.close();
            }
        }

        return false;
    }
}
