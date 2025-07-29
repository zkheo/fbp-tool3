import { ElMessage } from 'element-plus'
export const envUrls = {
    "TEST":"/test",
    "PROD":"/prod",
}

export const success = '200';

export const evnUrlKey = "evnUrl"
export const evnTokenKey = "evnToken"

export const routePathKey = "routePath"


export const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const jsonFormat = (data) => {
    if (isJson(data)) {
        return JSON.stringify(JSON.parse(data), null, 4);
    } else {
        return data;
    }
}

export const copy = (data) => {
    // 创建一个临时的文本区域，用于存储要拷贝的文本
    const textarea = document.createElement('textarea');
    textarea.value = data; // 将要拷贝的文本设置为所选单元格的值
    document.body.appendChild(textarea);
    textarea.select(); // 选中文本区域的内容
    try {
        // 执行拷贝操作
        const successful = document.execCommand('copy');
        const msg = successful ? '拷贝成功' : '拷贝失败';
        ElMessage({
            message: msg,
            type: successful ? 'success' : 'error'
        });
    } catch (err) {
        ElMessage.error('拷贝失败，请尝试手动拷贝');
    } finally {
        // 移除临时的文本区域
        document.body.removeChild(textarea);
    }
}
