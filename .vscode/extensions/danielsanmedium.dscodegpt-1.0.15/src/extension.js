const vscode = require('vscode');
const webview = require('./utils/webview.js');
const language = require('./utils/language.js');
const prompts = require('./utils/prompts.js');
const stackoverflow = require('./utils/stackoverflow.js');
const stackoverflow_webview = require('./utils/stackoverflow_webview.js');
const openai_client = require('./clients/openai_client.js');
const cohere_client = require('./clients/cohere_client.js');
const apis = require('./utils/apis.js');

/* GLOBAL VARs */

// OpenAI - Cohere API Key
const API_KEY = "API_KEY";

// StackOverflow Vars
let so_url = '';
let so_title = '';
let so_post = '';
let so_post_html = '';
let so_answer = '';
let so_answer_html = '';
let so_score = '';

async function getOpenAI(cleanPromptText, promptType, context) {	
	
	// url error handler
	const url_error = 'More information about this error: https://www.codegpt.co/docs/tutorial-basics/api_errors'
	//API Settings
	const apiKey = await context.secrets.get(API_KEY);

	if (!apiKey) {
		setApiKey(context);
		vscode.window.showWarningMessage('Enter your API KEY to save it securely.');
		return 'Please enter your api key, go to https://codegpt.co for more information.';
	}
	
	let model = vscode.workspace.getConfiguration().get('CodeGPT.model');
	let temperature = vscode.workspace.getConfiguration().get('CodeGPT.temperature');
	let maxTokens = vscode.workspace.getConfiguration().get('CodeGPT.maxTokens');
	let language = vscode.workspace.getConfiguration().get('CodeGPT.query.language');

	//default temperature 0.3
	if (temperature == "") {
		temperature = 0.3;
	}

	//default maxTokens 500
	if (maxTokens == "") {
		maxTokens = 500;
	}

	//One Shot
	let one_shot_prompt = prompts.getCommandPrompt(cleanPromptText, promptType, language);

	// Progress Location init
	const progressOptions = {
		location: vscode.ProgressLocation.Notification,
		title: "CodeGPT",
		cancellable: true
	};

	let response;

	await vscode.window.withProgress(progressOptions, async (progress, token) => {

		// Update the progress bar
		progress.report({ message: "Formatting text" });

		// if the progress is canceled
		if (token.isCancellationRequested) {
			return;
		}

		// Update the progress bar
		progress.report({ message: "I am thinking..." });

		//API Providers
		const provider = vscode.workspace.getConfiguration().get('CodeGPT.apiKey');

		try{
			
			let completion = null;
			if(provider == 'OpenAI'){
				
				//defautl model text-davinci-003
				if (model == "") {
					model = 'text-davinci-003';
				}

				// OpenAI handler
				completion = await openai_client.createOpenAiCompletion(apiKey, model, one_shot_prompt, temperature, maxTokens);

				if (completion !== undefined) {
					if(completion.status >= 200 && completion.status <= 299)
					{
						response = completion.data.choices[0].text;
						//OpenAI maxToken handler
						if(completion.data.usage.total_tokens && completion.data.usage.total_tokens >= maxTokens) 
						{	
							vscode.window.showWarningMessage(`Ops! Incomplete Completion.
							The request requires ${completion.data.usage.total_tokens} tokens and you only have ${maxTokens}. Add more tokens in your CodeGPT Settings.`);
						}
					}
					else
					{
						const http_error = completion.body.message;
						const statusCode = completion.status;
						response = `${provider} API Response was: Error ${statusCode}: ${http_error}. ${url_error}`;
					}
				}
				else
				{
					response = completion;
					vscode.window.showErrorMessage(`${provider} API Response was: ${completion} `);
				}

			}else if(provider == 'Cohere'){

				//defautl model command-xlarge-nightly
				if (model == "") {
					model = 'command-xlarge-nightly';
				}

				//Cohere handler
				completion = await cohere_client.createCohereCompletion(apiKey, model, one_shot_prompt, temperature, maxTokens);
				
				if (completion !== undefined) {
					// status 200
					if(completion.statusCode >= 200 && completion.statusCode <= 299)
					{
						response = completion.body.generations[0].text;
					}else
					{
						const http_error = completion.body.message;
						const statusCode = completion.statusCode;
						response = `${provider} API Response was: Error ${statusCode}: ${http_error}. ${url_error}`;
					}
				}
				else
				{
					response = completion;
					vscode.window.showErrorMessage(`${provider} API Response was: ${completion} `);
				}

			}
			
			if(response == '' || response == null)
			{
				response = `${provider} API could not process the query, try selecting the code and using Ask CodeGPT to write your own query`;
			}

		}
		catch(error)
		{
			response = `${provider} API Response was: ${error}. ${url_error}`;
			vscode.window.showErrorMessage(
				`${provider} API Response was: ${error} `,
			)
		}
		
		progress.report({ increment: 100, message: "" });
	}).then(undefined, err => {
		response = 'Error: '+err;
	});
	
	return response;
}

// asynchronous function to send the query to the provider
async function getCodeGPTOutput(text, type, context, languageId, data_file) {

	let chat = false;
	let copy = false;
	let title = '';
	let typing = false;

	//limpiamos el texto que ingresó el usuario
	const cleanPromptText = text.split("\r\n").join("\n");
	let responseText = "";
	try {
		responseText = await getOpenAI(cleanPromptText, type, context);
	}
	catch (error) {
		console.log(error);
	}

	if(type == 'askStackOverflow')
	{
		const so_array = [so_url, so_title, so_post, so_post_html, so_answer, so_answer_html, so_score];
		ShowStackOverflowPanel(type, so_array, responseText, context);
		return;
	}

	if(type == 'compileAndRunCodeGPT')
	{
		title = 'Code GPT Console:';
		copy = true;
		typing = true;
		webview.createWebViewPanel(type, responseText, context, chat, copy, title, typing, data_file, languageId);
		return; 
	}

	if(type == 'explainCodeGPT')
	{
		title = 'Explain Code GPT:';
		copy = true;
		typing = true;
		webview.createWebViewPanel(type, responseText, context, chat, copy, title, typing, data_file, languageId);
		return; 
	}

	if(type == 'documentCodeGPT')
	{
		title = 'Document Code GPT:';
		copy = true;
		typing = true;
		webview.createWebViewPanel(type, responseText, context, chat, copy, title, typing, data_file, languageId);
		return; 
	}

	if(type == 'findProblemsCodeGPT')
	{
		title = 'Find Problems Code GPT:';
		copy = true;
		typing = true;
		webview.createWebViewPanel(type, responseText, context, chat, copy, title, typing, data_file, languageId);
		return; 
	}

	if(type == 'searchApisCodeGPT')
	{
		title = 'Search APIs Code GPT:';
		copy = true;
		typing = true;
		webview.createWebViewPanel(type, responseText, context, chat, copy, title, typing, data_file, languageId);
		return; 
	}
	
	const outputDocument = await vscode.workspace.openTextDocument({
		content: "Loading...",
		language: "markdown",
	});

	const outputDocumentEditor = await vscode.window.showTextDocument(
		outputDocument,
		{
			viewColumn: vscode.ViewColumn.Beside,
			preserveFocus: true,
			preview: true
		},
	);

	if(languageId != null)
	{
		vscode.languages.setTextDocumentLanguage(outputDocument, languageId);
	}

	//la cargamos en el editor
	outputDocumentEditor.edit(editBuilder => {
		editBuilder.replace(
			new vscode.Range(
				new vscode.Position(0, 0),
				new vscode.Position(99999999999999, 0),
			),
			`${responseText}`,
		)
	});
	
}

async function setApiKey(context){
	// We show a dialog box to the user to enter the Key
	const api_key = await vscode.window.showInputBox({
		title: "Enter your API KEY",
		password: true,
		placeHolder: '**************************************',
		ignoreFocusOut: true
	});

	// If the user canceled the dialog
	if (!api_key) {
		vscode.window.showWarningMessage('Empty value');
		return;
	}

	// Storing a secret
	await context.secrets.store(API_KEY, api_key);

	// Mostramos un mensaje al usuario para confirmar que la token se ha guardado de forma segura
	vscode.window.showInformationMessage('API KEY saved');
}

// Init Webview
async function ShowStackOverflowPanel(type, so_array, response, context){
	// Set the HTML and JavaScript content of the WebView
	stackoverflow_webview.createWebViewPanel(type, so_array, response, context);
}

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	let setApiKeyCodeGPT = vscode.commands.registerCommand('codegpt.setApiKeyCodeGPT', async() => {
		
		setApiKey(context);

	});

	let removeApiKeyCodeGPT = vscode.commands.registerCommand('codegpt.removeApiKeyCodeGPT', async () => {
		
		await context.secrets.delete(API_KEY);
		vscode.window.showWarningMessage('Your API KEY was removed');
	});

	let getCode = vscode.commands.registerCommand('codegpt.getCode', async () => {
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
		let languageId = editor.document.languageId;

		//terraform exeption
		if(languageId == 'tf')
		{
			languageId = 'terraform';
		}

		const comment_character = language.detectLanguage(languageId);
		if(comment_character == false)
		{
			vscode.window.showErrorMessage(
                "This language is not supported",
            );
			return;
		}

		if (!editor) {
			vscode.window.showInformationMessage('Open an editor.');
			return;
		}

		let selection;
		const cursorPosition = editor.selection.active;
		selection = new vscode.Selection(cursorPosition.line, 0, cursorPosition.line, cursorPosition.character);
		//console.log(document.getText(selection))

		let comment = document.getText(selection);

		let one_shot_prompt = languageId;
		const error_message_cursor = "Create a comment and leave the cursor at the end of the comment line";
		if (comment == '') {
			vscode.window.showErrorMessage(
				error_message_cursor,
			)
			return;
		}
		// el caracter existe
		const exist = comment.indexOf(comment_character);
		if (exist == -1) {
			vscode.window.showErrorMessage(
				error_message_cursor,
			)
			return;
		}
		const final_comment = comment.replaceAll(comment_character, one_shot_prompt + ': ');
		//console.log(final_comment);

		getCodeGPTOutput(final_comment, 'getCodeGPT', context, languageId, []);
	});

	let askStackOverflow = vscode.commands.registerCommand('codegpt.askStackOverflow', async () => {
		
		// validate to have an editor tab open
		if(vscode.window.activeTextEditor == undefined)
		{
			vscode.window.showWarningMessage(
				"To get started, you must first have an editor tab open"
			)
			return;
		}

		const text = await vscode.window.showInputBox({
			title: "Ask StackOverflow",
			prompt: "Enter a question",
			placeHolder: "Question...",
		})
		if (text) {
			const questions = await stackoverflow.getStackOverflowQuestions(text);

			if(questions == null){
				vscode.window.showWarningMessage(
					"No questions related to this topic were found on StackOverflow, please try again in a different way."
				)
				return;
			}

			
			const options = await vscode.window.showQuickPick(questions, {
					matchOnDetail : true
			});

			//nothing selected
			if(options === undefined)
			{
				return;
			}
			

			const result = await stackoverflow.getStackOverflowResult(options.link);
			let language = vscode.workspace.getConfiguration().get('CodeGPT.query.language');
			const text_final = `This is a StackOverflow question:""" `+result[2]+` """. 
			Now you write a respond in `+language+` like a programming expert: `;

			//r = [url, title, post, post_html, answer, answer_html, score]
			so_url = result[0];
			so_title = result[1];
			so_post = result[2];
			so_post_html = result[3];
			so_answer = result[4];
			so_answer_html = result[5];
			so_score = result[6];

			getCodeGPTOutput(text_final, 'askStackOverflow', context, null, []);
			
			
		}else {
			vscode.window.showErrorMessage(
				"Empty text!",
			)
		}
	});

	let searchApisCodeGPT = vscode.commands.registerCommand('codegpt.searchApisCodeGPT', async () => {
		
		// validate to have an editor tab open
		if(vscode.window.activeTextEditor == undefined)
		{
			vscode.window.showWarningMessage(
				"To get started, you must first have an editor tab open"
			)
			return;
		}

		const languageId = vscode.window.activeTextEditor.document.languageId;

		const text = await vscode.window.showInputBox({
			title: "Search APIs Code GPT",
			prompt: "Find an API you'd like to work with",
			placeHolder: "",
		})
		if (text) {
			const api_result = await apis.getAPIs(text);

			if(api_result.length == 0){
				vscode.window.showWarningMessage(
					"No API found"
				)
				return;
			}

			
			const options = await vscode.window.showQuickPick(api_result, {
					matchOnDetail : true
			});

			//nothing selected
			if(options === undefined)
			{
				return;
			}
			
			let language = vscode.workspace.getConfiguration().get('CodeGPT.query.language');
			

			/*
				detail:
				'Facebook Login, Share on FB, Social Plugins, Analytics and more'
				label:
				'Facebook'
				link:
				'https://developers.facebook.com/'
			*/

		const text_final = `Act like a programming expert and write in ${language} a short description about "${options.label} ${options.link} ${options.detail}" with an code example in ${languageId}. Use this format:
			Documentation: ${options.link}
			Description:
			Example:
			`;

			getCodeGPTOutput(text_final, 'searchApisCodeGPT', context, languageId, []);
			
			
		}else {
			vscode.window.showErrorMessage(
				"Empty text!",
			)
		}
	});

	let askCodeGPT = vscode.commands.registerCommand('codegpt.askCodeGPT', async () => {
		
		// validate to have an editor tab open
		if(vscode.window.activeTextEditor == undefined)
		{
			vscode.window.showWarningMessage(
				"To get started, you must first have an editor tab open"
			)
			return;
		}

		//abrimos un input de texto para preguntar
		const text = await vscode.window.showInputBox({
			title: "Ask CodeGPT",
			prompt: "Enter question",
			placeHolder: "Question",
		})
		if (text) {
			let text_final = '';
			const selection = vscode.window.activeTextEditor.selection;
			const selectedText = vscode.window.activeTextEditor.document.getText(selection);
			const languageId = vscode.window.activeTextEditor.document.languageId;
			if (selectedText != '') {
				let language = vscode.workspace.getConfiguration().get('CodeGPT.query.language');
				let prefijo = '';
				if (language == 'Spanish') {
					prefijo = ', con respecto al siguiente código: ';
				}
				else {
					prefijo = ', according to the following code: ';
				}
				text_final = text + prefijo + selectedText.split("\r\n").join("\n");
			}
			else {
				text_final = text;
			}
			
			//new editor with the response
			getCodeGPTOutput(text_final, 'askCodeGPT', context, languageId, []);
		} else {
			vscode.window.showErrorMessage(
				"Empty text!",
			)
		}
	});

	let commandExplainCodeGPT = vscode.commands.registerCommand('codegpt.explainCodeGPT', async () => {

		const selection = vscode.window.activeTextEditor.selection;
		const selectedText = vscode.window.activeTextEditor.document.getText(selection);
		const path_file_name = vscode.window.activeTextEditor.document.fileName;
		const file_name = path_file_name.substring(path_file_name.lastIndexOf('/') + 1);
		const start_line = vscode.window.activeTextEditor.selection.start.line+1;
		const end_line = vscode.window.activeTextEditor.selection.end.line+1;
		const languageId = vscode.window.activeTextEditor.document.languageId;
		const data_file = [file_name, start_line, end_line];

		if (selectedText == '') {
			vscode.window.showErrorMessage(
				"No text selected!",
			)
		} else {
			getCodeGPTOutput(selectedText, 'explainCodeGPT', context, languageId, data_file);
		}
	});

	let commandCompileAndRunCodeGPT = vscode.commands.registerCommand('codegpt.compileAndRunCodeGPT', async () => {

		const selection = vscode.window.activeTextEditor.selection;
		const selectedText = vscode.window.activeTextEditor.document.getText(selection);

		const path_file_name = vscode.window.activeTextEditor.document.fileName;
		const file_name = path_file_name.substring(path_file_name.lastIndexOf('/') + 1);
		const start_line = vscode.window.activeTextEditor.selection.start.line+1;
		const end_line = vscode.window.activeTextEditor.selection.end.line+1;
		const languageId = vscode.window.activeTextEditor.document.languageId;
		const data_file = [file_name, start_line, end_line];

		if (selectedText == '') {
			vscode.window.showErrorMessage(
				"No text selected!",
			)
		} else {
			getCodeGPTOutput(selectedText, 'compileAndRunCodeGPT', context, languageId, data_file);
		}
	});

	let commandRefactorCodeGPT = vscode.commands.registerCommand('codegpt.refactorCodeGPT', async () => {

		const selection = vscode.window.activeTextEditor.selection;
		const selectedText = vscode.window.activeTextEditor.document.getText(selection);

		const path_file_name = vscode.window.activeTextEditor.document.fileName;
		const file_name = path_file_name.substring(path_file_name.lastIndexOf('/') + 1);
		const start_line = vscode.window.activeTextEditor.selection.start.line+1;
		const end_line = vscode.window.activeTextEditor.selection.end.line+1;
		const languageId = vscode.window.activeTextEditor.document.languageId;
		const data_file = [file_name, start_line, end_line];

		if (selectedText == '') {
			vscode.window.showErrorMessage(
				"No text selected!",
			)
		} else {
			getCodeGPTOutput(selectedText, 'refactorCodeGPT', context, languageId, data_file);
		}
	});

	let commandDocumentCodeGPT = vscode.commands.registerCommand('codegpt.documentCodeGPT', async () => {

		const selection = vscode.window.activeTextEditor.selection;
		const selectedText = vscode.window.activeTextEditor.document.getText(selection);

		const path_file_name = vscode.window.activeTextEditor.document.fileName;
		const file_name = path_file_name.substring(path_file_name.lastIndexOf('/') + 1);
		const start_line = vscode.window.activeTextEditor.selection.start.line+1;
		const end_line = vscode.window.activeTextEditor.selection.end.line+1;
		const languageId = vscode.window.activeTextEditor.document.languageId;
		const data_file = [file_name, start_line, end_line];

		if (selectedText == '') {
			vscode.window.showErrorMessage(
				"No text selected!",
			)
		} else {
			getCodeGPTOutput(selectedText, 'documentCodeGPT', context, languageId, data_file);
		}
	});

	let commandFindProblemsCodeGPT = vscode.commands.registerCommand('codegpt.findProblemsCodeGPT', async () => {

		const selection = vscode.window.activeTextEditor.selection;
		const selectedText = vscode.window.activeTextEditor.document.getText(selection);

		const path_file_name = vscode.window.activeTextEditor.document.fileName;
		const file_name = path_file_name.substring(path_file_name.lastIndexOf('/') + 1);
		const start_line = vscode.window.activeTextEditor.selection.start.line+1;
		const end_line = vscode.window.activeTextEditor.selection.end.line+1;
		const languageId = vscode.window.activeTextEditor.document.languageId;
		const data_file = [file_name, start_line, end_line];
		
		if (selectedText == '') {
			vscode.window.showErrorMessage(
				"No text selected!",
			)
		} else {
			getCodeGPTOutput(selectedText, 'findProblemsCodeGPT', context, languageId, data_file);
		}
	});

	let commandUnitTestCodeGPT = vscode.commands.registerCommand('codegpt.unitTestCodeGPT', async () => {

		const selection = vscode.window.activeTextEditor.selection;
		const selectedText = vscode.window.activeTextEditor.document.getText(selection);
		const path_file_name = vscode.window.activeTextEditor.document.fileName;
		const file_name = path_file_name.substring(path_file_name.lastIndexOf('/') + 1);
		const start_line = vscode.window.activeTextEditor.selection.start.line+1;
		const end_line = vscode.window.activeTextEditor.selection.end.line+1;
		const languageId = vscode.window.activeTextEditor.document.languageId;
		const data_file = [file_name, start_line, end_line];

		if (selectedText == '') {
			vscode.window.showErrorMessage(
				"No text selected!",
			)
		} else {
			getCodeGPTOutput(selectedText, 'unitTestCodeGPT', context, languageId, data_file);
		}
	});

	//subscribed events
	context.subscriptions.push(askCodeGPT, 
			commandCompileAndRunCodeGPT,
			commandExplainCodeGPT, 
			commandRefactorCodeGPT,
			commandDocumentCodeGPT, 
			commandFindProblemsCodeGPT, 
			getCode, 
			setApiKeyCodeGPT, 
			removeApiKeyCodeGPT,
			commandUnitTestCodeGPT,
			askStackOverflow,
			searchApisCodeGPT);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
