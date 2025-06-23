#!/usr/bin/env node

import { FastMCP } from 'fastmcp';
import { z } from "zod";
import {
  OxylabsAIStudioSDK
} from 'oxylabs-ai-studio';


const api_key = process.env.OXYLABS_AI_STUDIO_API_KEY;
const api_url = process.env.OXYLABS_AI_STUDIO_API_URL || 'https://api-aistudio.oxylabs.io/v1';


if (!api_key) {
  throw new Error("OXYLABS_AI_STUDIO_API_KEY is not set");
}

const sdk = new OxylabsAIStudioSDK({
  apiUrl: api_url,
  apiKey: api_key,
  timeout: 240000,
  retryAttempts: 3,
});


const server = new FastMCP({
  name: "Oxylabs AI Studio MCP",
  version: "0.1.0",
  logLevel: "debug",
});


server.addTool({
  name: "generate_schema",
  description: "Generates json schema in openapi format from provided prompt.",
  parameters: z.object({
    user_prompt: z.string(),
    app_name: z.enum(["ai_crawl", "ai_scrape", "browser_agent"]),
  }),
  execute: async (args) => {
    if (args.app_name === 'ai_scrape') {
      const response = await sdk.aiScrape.generateSchema(args.user_prompt);
      return response;
    } else if (args.app_name === 'ai_crawl') {
      const response = await sdk.aiCrawl.generateSchema(args.user_prompt);
      return response;
    } else if (args.app_name === 'browser_agent') {
      const response = await sdk.browserAgent.generateSchema(args.user_prompt);
      return JSON.stringify(response);
    } else {
      throw new Error(`Invalid app name ${args.app_name}`);
    }
  },
});


server.addTool({
  name: "ai_scrape",
  description: `Scrape the contents of the web page and return the data in the specified format.
  Schema is required only if output_format is json. 
'render_javascript' is used to render javascript heavy websites.`,
  parameters: z.object({
    url: z.string().url().describe("The URL to scrape"),
    output_format: z.enum(["json", "markdown"]).describe("The format of the output. If json, the schema is required. Markdown returns full text of the page."),
    schema: z.object().optional().describe("The schema to use for the scrape. Only required if output_format is json."),
    render_javascript: z.boolean().default(false).optional().describe("Whether to render the HTML of the page using javascript. Much slower, therefore use it only for websites that require javascript to render the page. Unless user asks to use it, first try to scrape the page without it. If results are unsatisfactory, try to use it."),
  }),
  execute: async (args) => {
    console.log(args);
    try {
      const response = await sdk.aiScrape.scrape(args);
      return JSON.stringify({content: response.data});
    } catch (error) {
      console.error(error);
      throw new Error(`Error scraping ${args.url}: ${error}`);
    }
  },
});

server.addTool({
  name: "ai_crawl",
  description: `Tool useful for crawling a website from starting url and returning data in a specified format.
    Schema is required only if output_format is json.
    'render_javascript' is used to render javascript heavy websites.
    'return_sources_limit' is used to limit the number of sources to return,
    for example if you expect results from single source, you can set it to 1`,
  parameters: z.object({
    url: z.string().url().describe("The URL from which crawling will be started"),
    user_prompt: z.string().describe("What information user wants to extract from the domain."),
    output_format: z.enum(["json", "markdown"]).describe("The format of the output. If json, the schema is required. Markdown returns full text of the page."),
    schema: z.object().optional().describe("The schema to use for the crawl. Only required if 'output_format' is json."),
    render_javascript: z.boolean().default(false).optional().describe("Whether to render the HTML of the page using javascript. Much slower, therefore use it only for websites that require javascript to render the page. Unless user asks to use it, first try to crawl the page without it. If results are unsatisfactory, try to use it."),
    return_sources_limit: z.number().optional().describe("The maximum number of sources to return. For example if you expect results from single source, you can set it to 1."),
  }),
  execute: async (args) => {
    try {
      const response = await sdk.aiCrawl.crawl(args);
      return JSON.stringify({content: response.data}) ;
    } catch (error) {
      console.error(error);
      throw new Error(`Error crawling ${args.url}: ${error}`);
    }
  },
});

server.addTool({
  name: "ai_browser_agent",
  description: `Run the browser agent and return the data in the specified format.
    This tool is useful if you need navigate around the website and do some actions.
    It allows navigating to any url, clicking on links, filling forms, scrolling, etc.
    Finally it returns the data in the specified format. Schema is required only if output_format is json.
    'task_prompt' describes what browser agent should achieve`,
  parameters: z.object({
    url: z.string().url().describe("The URL to start the browser agent navigation from."),
    task_prompt: z.string().describe("What browser agent should do."),
    output_format: z.enum(["json", "markdown", "html", "screenshot"]).describe(`The output format. Screenshot is base64 encoded jpeg image. Markdown returns full text of the page including links. If json, the schema is required.`),
    schema: z.object().optional().describe("The schema in openapi format to use for the browser agent. Only required if 'output_format' is json."),
  }),
  execute: async (args) => {
    try {
      console.log(args);
      const response = await sdk.aiBrowse.browse(args);
      return JSON.stringify({content: response.data});
    } catch (error) {
      console.error(error);
      throw new Error(`Error running browser agent: ${error}`);
    }
  },
});

server.addTool({
  name: "ai_search",
  description: `Search the web based on a provided query.
    'return_content' is used to return markdown content for each search result. If 'return_content'
        is set to True, you don't need to use ai_scrape to get the content of the search results urls,
        because it is already included in the search results.
    if 'return_content' is set to True, prefer lower 'limit' to reduce payload size.`,
  parameters: z.object({
    query: z.string().describe("The query to search for."),
    limit: z.number().lte(50).default(10).optional().describe("Maximum number of results to return. Default is 10."),
    render_javascript: z.boolean().default(false).optional().describe("Whether to render the HTML of the page using javascript. Much slower, therefore use it only if user asks to use it. First try to search with setting it to False."),
    return_content: z.boolean().default(true).optional().describe("Whether to return markdown content of the search results. Default is True."),
  }),
  execute: async (args) => {
    try {
      console.error(args);
      const response = await sdk.aiSearch.search(args);
      return JSON.stringify({content: response.data});
    } catch (error) {
      console.error(error);
      throw new Error(`Error searching: ${error}`);
    }
  },
});


server.start({
  transportType: "stdio",
});

