export const DEFAULT_PDF_FILENAME = 'Markdown-导出文件';

export const DEFAULT_MARKDOWN_CONTENT = `
# 欢迎使用雅辑Markdown

雅辑Markdown (Inkflow Markdown Editor) 是一款采用优雅清新美学设计的 Markdown 编辑器，注重美学与功能的完美平衡。它支持实时预览 Markdown 文本，并能通过浏览器的打印功能将内容导出为高质量的 PDF 文档。

## ✨ 主要功能

*   **实时预览**: 在您输入 Markdown 文本时，即时在右侧面板看到渲染后的效果。
*   **优雅清新设计**: 采用 Tailwind CSS 精心定制样式，提供舒适、沉浸式的阅读和编辑体验。
*   **PDF 导出**: 利用浏览器的原生打印功能导出为 PDF，确保导出内容与预览高度一致。
*   **自定义 PDF 标题**: 用户可以在导出 PDF 前自定义文件的标题。

---

## 快速上手

### 文本格式化

你可以轻松创建 *斜体*、**粗体**，甚至是 ***粗斜体*** 文本。

使用反引号创建 \`内联代码块\`。

### 列表

**无序列表:**
* 项目 A
* 项目 B
  * 子项目 B1

**有序列表:**
1. 第一步
2. 第二步
3. 第三步

### 引用

> “简洁是最终的复杂。” - 列奥纳多·达·芬奇

---

## 代码块示例

您可以在 Markdown 中插入代码块来展示代码片段。

**Python 斐波那契数列:**
\`\`\`python
# 示例：计算斐波那契数列
def fibonacci(n):
    """返回一个包含斐波那契数列至 n 的列表。"""
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a+b
    return result

# 获取100以内的斐波那契数
print(fibonacci(100))
\`\`\`

---

## 表格

| 特性         | 描述                                   |
|--------------|----------------------------------------|
| 实时预览     | 即时反馈您的 Markdown 输入             |
| PDF 导出     | 通过浏览器打印功能轻松导出             |
| 样式美观     | 使用 Tailwind CSS 打造的现代化界面     |

---

## 链接与图片

访问我们的项目仓库：[雅辑Markdown](https://github.com/imbyron/Inkflow-Markdown-Editor)
![雅辑Markdown](images/InkflowMarkdownEditor.png "雅辑Markdown")

---

现在，开始你的创作吧！
`;
