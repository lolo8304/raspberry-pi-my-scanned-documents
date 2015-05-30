/*
 * Calaca - Search UI for Elasticsearch
 * https://github.com/romansanchez/Calaca
 * http://romansanchez.me
 * @rooomansanchez
 * 
 * v1.2.0
 * MIT License
 */

/* Configs */
/**
 *
 * url - Cluster http url
 * index_name - Index name or comma-separated list
 * type - Type
 * size - Number of results to display at a time when pagination is enabled.
 * search_delay - Delay between actual search request in ms. Reduces number of queries to cluster by not making a request on each keystroke. 
 */

var CALACA_CONFIGS = {
	/* points to your domain server elasticsearch folder - important to not run in CORS issues */
	url: window.location.origin+"/elasticsearch",

	/* predefined name for elasticsaerch index + type names */
	index_name: "scan",
	type: "ocr",
	
	/* result size for paging */
	size: 10,

	/* delay time in ms after last typing of character to search */
	search_delay: 500,

	/* swith in elasticsearch to use wildcard-search */
	/* see analyze_wildcard setting in https://www.elastic.co/guide/en/elasticsearch/reference/1.4/search-uri-request.html */
	analyzeWildcards: true,
		
	/* query is marked within OCR text of document */
	/* seperator is splitting regions with marked text from each other */
	/* exmple: ...bla bla bla bla<mark>found</mark> bla bla bla...    ...bl blbl bl <mark>yes</mark>bb bbb ...*/
	markSeperator: "...",
	/* mark seperator length is the max numnber of characters shown before and after the <mark>text</mark> */
	markSeperatorLength: 40
}