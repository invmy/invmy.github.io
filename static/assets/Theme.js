document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;
    
    // 主页主题------------------------------------------------------------------------------
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        html {    
            background: url('https://pic3.zhimg.com/v2-15f60b69642ba46964509c51d2645202_r.jpg') no-repeat center center fixed;
            background-size: cover;
        }

        /* 主体布局 */
        body {
            min-width: 200px;
            max-width: 885px;
            margin: 30px auto;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            line-height: 1.5;
            background: rgba(255, 255, 255, 0.9); 
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            overflow: auto;
        }

        /* 侧边导航 */
        .SideNav {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            min-width: unset;
        }

        .SideNav-item:hover {
            background-color: #e8f0fe;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .SideNav-item {
            transition: transform 0.2s, background-color 0.2s;
        }

        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: #4285f4;
        }
        `;
        document.head.appendChild(style);
    }

    // 文章页主题------------------------------------------------------------------------------
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');

        let style = document.createElement("style");
        style.innerHTML = `
        html {    
            background: url('https://pic3.zhimg.com/v2-15f60b69642ba46964509c51d2645202_r.jpg') no-repeat center center fixed;
            background-size: cover;
        }

        /* 主体布局 */
        body {
            min-width: 200px;
            max-width: 883px;
            margin: 30px auto;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            line-height: 1.5;
            background: rgba(255, 255, 255, 0.9); 
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            overflow: auto;
        }

        /* Markdown内容 */
        .markdown-body img {
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .markdown-alert {
            border-radius: 10px;
        }

        /* 代码块 */
        .markdown-body .highlight pre, .markdown-body pre {
            color: rgb(0, 0, 0);
            background-color: rgba(242, 243, 242, 0.9);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            padding-top: 15px;
            border-radius: 8px;
        }

        /* 标题 */
        .markdown-body h1 {
            display: inline-block;
            font-size: 1.3rem;
            font-weight: bold;
            background: rgb(255, 86, 34);
            color: #ffffff;
            padding: 3px 12px;
            border-radius: 8px;
            margin-right: 2px;
        }
        `;
        document.head.appendChild(style);
    }

    // 搜索页主题--------------------------------------------------------------------
    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        html {    
            background: url('https://pic3.zhimg.com/v2-15f60b69642ba46964509c51d2645202_r.jpg') no-repeat center center fixed;
            background-size: cover;
        }

        /* 主体布局 */
        body {
            min-width: 200px;
            max-width: 885px;
            margin: 30px auto;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            line-height: 1.5;
            background: rgba(255, 255, 255, 0.9); 
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            overflow: auto;
        }

        .SideNav {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 12px;
            min-width: unset;
        }

        .SideNav-item:hover {
            background-color: #e8f0fe;
            border-radius: 12px;
            transform: scale(1.02);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .SideNav-item {
            transition: transform 0.2s, background-color 0.2s;
        }

        .subnav-search-input {
            border-radius: 20px;
        }

        .subnav-search-icon {
            top: 9px;
        }

        button.btn.float-left {
            display: none;
        }

        .subnav-search {
            width: unset;
            height: 36px;
        }
        `;
        document.head.appendChild(style);

        // 搜索框回车触发
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });
    }
});
