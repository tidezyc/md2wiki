module.exports = {
    // ----- Code blocks
    code_inline: function(tokens, idx, options, env, slf){
        var token = tokens[idx];
		return '{{' + token.content + '}}'
	},
    code_block: function(tokens, idx, options, env, slf){
	},

    // For markdown-it, fence are always blocks
    fence: function(tokens, idx, options, env, slf) {
        var token = tokens[idx];
        var lang = token.info;
		var header
		if(lang){
			header = '{code}'
		}else{
			header = '{code}'
		}

        return header + '\n' + token.content + '{code}\n\n';
    },


    // ----- Paragraph / Blocks

    paragraph_open: function() {
        return '';
    },
    paragraph_close: function() {
        return '\n'
    },

    hr: function(tokens, idx, options, env, slf) {
        return '----'
    },

    // ----- Links / Images

    link_open: function(tokens, idx, options, env, slf) {
        var token = tokens[idx];
		var href = token.attrs[token.attrIndex('href')][1];
		this._links = this._links || [];
        this._links.push(href);

        return '[';
    },

    link_close: function(tokens, idx, options, env, slf) {
		this._links = this._links || [];
        var href = this._links.pop(href);

        return '|' + href + ']';
    },

    image: function(tokens, idx, options, env, slf) {
        var token = tokens[idx];

        var src = token.attrs[token.attrIndex('src')][1]
        //var alt = slf.renderInlineAsText(token.children, options, env);

        return '!' + src + '!';
    },

    // ----- Inline

    strong_open: function(){
		return '*'
	},
    strong_close: function(){
		return '*'
	},

    em_open: function(){
		return '_'
	},
    em_close: function(){
		return '_'
	},

    s_open: function(){
		return '-'
	},
    s_close: function(){
		return '-'
	},

    // ------ Headings

    heading_open: function(tokens, idx, options, env, slf) {
        var token = tokens[idx];
        return token.tag + '. ';
    },
    heading_close: function() {
        return '\n\n';
    },

    blockquote_open: function(tokens, idx, options, env, slf) {
        //var token = tokens[idx];

        //slf._blockquoteNested = (slf._blockquoteNested || 0) + 1;
        //return N(slf._blockquoteNested, token.markup) + ' ';
		return '{quote}'
    },
    blockquote_close: function(tokens, idx, options, env, slf) {
        //slf._blockquoteNested = slf._blockquoteNested - 1;
        //return '';
		return '{quote}\n\n'
    },


    // ------ Lists

    bullet_list_open: function(tokens, idx, options, env, slf){
		var token = tokens[idx];
		slf._listNested = (slf._listNested || '') + '*'
		return ''
	},
    bullet_list_close: function(tokens, idx, options, env, slf){
		slf._listNested = slf._listNested.slice(0,-1)
		if(slf._listNested){
			return ''
		}
		return '\n'
	},

    ordered_list_open: function(tokens, idx, options, env, slf){
		var token = tokens[idx];
		slf._listNested = (slf._listNested || '') + '#'
		return ''
	},
    ordered_list_close: function(tokens, idx, options, env, slf){
		slf._listNested = slf._listNested.slice(0,-1)
		if(slf._listNested){
			return ''
		}
		return '\n'
	},

    list_item_open: function(tokens, idx, options, env, slf) {
		var token = tokens[idx];
		return slf._listNested + ' '
    },
    list_item_close: function(tokens, idx, options, env, slf) {
        return '';
    },


    // ------- Tables

    table_open: function() {
        return '';
    },
    table_close: function() {
        return '\n';
    },

    thead_open: function(tokens, idx, options, env, slf) {
        slf._tableColumnStyles = [];
        return '';
    },
    thead_close: function(tokens, idx, options, env, slf) {
        return '';
    },

    tbody_open: function() {
        return '';
    },
    tbody_close: function() {
        return '';
    },

    tr_open: function(tokens, idx, options, env, slf) {
        return '';
    },
    tr_close: function(tokens, idx, options, env, slf) {
        return '\n';
    },

    th_open: function(){
		return '||'
	},
    th_close: function() {
        return '';
    },

    td_open: function(){
		return '|'
	},
    td_close: function() {
        return '';
    },
};

