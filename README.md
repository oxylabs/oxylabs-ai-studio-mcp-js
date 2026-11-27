
<p align="center">
  <img src="assets/logo.svg" alt="Oxylabs + MCP">
</p>
<h1 align="center" style="border-bottom: none;">
  Oxylabs AI Studio MCP Server
</h1>

<div align="center">
  
<a href="https://oxylabs.io/?utm_source=github&utm_medium=referral&utm_content=oxylabs-ai-studio-mcp-js&utm_campaign=banner&groupid=877"><img src="https://img.shields.io/badge/🚀_Get_Started-FF6B35?style=for-the-badge" alt="Get started"></a>
<a href="https://developers.oxylabs.io/?utm_source=github&utm_medium=referral&utm_content=oxylabs-ai-studio-mcp-js&utm_campaign=banner&groupid=877"><img src="https://img.shields.io/badge/📚_Documentation-4A90E2?style=for-the-badge" alt="Documentation"></a>
<a href="https://dashboard.oxylabs.io"><img src="https://img.shields.io/badge/📊_Dashboard-2EA44F?style=for-the-badge" alt="Dashboard"></a>
<a href="https://discord.gg/Pds3gBmKMH"><img src="https://img.shields.io/badge/💬_Discord-5865F2?style=for-the-badge" alt="Discord"></a>
<a href="https://www.youtube.com/@oxylabs"><img src="https://img.shields.io/badge/▶️_YouTube-FF0000?style=for-the-badge" alt="YouTube"></a>

[![Licence](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oxylabs/oxylabs-ai-studio-mcp-py/blob/main/LICENSE)

</div>

---
## Disclaimer
This repository is still fully supported, but if you are using Oxylabs Web API please refer to Web API MCP repository:
[Web API MCP](https://github.com/oxylabs/web-api-mcp)

## 📖 Overview

The Oxylabs AI Studio MCP server provides various AI tools for your agents.:
- Scrape: Allows getting content from any url in json or markdown format.
- Crawl: Based on prompt crawls a website and collects data in markdown or json format.
- Browser Agent: Given a task, agent controls a browser to achieve given object and returns data in markdown, json, html or screenshot formats.
- Search: Allows search the web for urls and their contents.

---

## ✅ Prerequisites

- API KEY: obtain your Api Key from Oxylabs AI Studio dashboard:
- node.js


### Basic Usage

Cursor setup:
```json
{
  "mcpServers": {
    "oxylabs-ai-studio": {
      "command": "npx",
      "args": ["oxylabs-ai-studio-mcp"],
      "env": {
        "OXYLABS_AI_STUDIO_API_KEY": "OXYLABS_AI_STUDIO_API_KEY"
      }
    }
  }
}
```
