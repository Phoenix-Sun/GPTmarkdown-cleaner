// 載入任何需要的輔助函數
const rateLimit = require('./rate-limit');  // 你需要自己實現這個模組

exports.handler = async function(event, context) {
    // CORS 設定
    const headers = {
        'Access-Control-Allow-Origin': '*', // 記得改成你的 GitHub Pages 網址
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // 處理 OPTIONS 請求（預檢請求）
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers
        };
    }

    // 檢查請求方法
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // 解析請求數據
        const { text, mode, removeSource } = JSON.parse(event.body);
        
        // 基本驗證
        if (!text) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: '請提供要轉換的文本' })
            };
        }

        // 檢查文本長度
        if (text.length > 50000) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: '文本太長' })
            };
        }

        // 處理文本
        const processedText = processMarkdown(text, mode === 'format', removeSource);
        
        // 返回結果
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                processedText,
                processTime: new Date().toISOString()
            })
        };
    } catch (error) {
        console.error('處理錯誤:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: '處理失敗',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};

function processMarkdown(text, autoNumber = false, removeSource = false) {
    // 你的原始 MarkdownProcessor 邏輯
    class MarkdownProcessor {
        constructor() {
            this.itemCounter = 1;
        }
        
        // ... 你的原始處理方法 ...
    }
    
    const processor = new MarkdownProcessor();
    return processor.processText(text, autoNumber, removeSource);
}
