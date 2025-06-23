
<p align="center">
  <img src="assets/logo.svg" alt="Oxylabs + MCP">
</p>
<h1 align="center" style="border-bottom: none;">
  Oxylabs AI Studio MCP Server
</h1>

<div align="center">

[![Licence](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oxylabs/oxylabs-ai-studio-mcp-py/blob/main/LICENSE)

</div>

---

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