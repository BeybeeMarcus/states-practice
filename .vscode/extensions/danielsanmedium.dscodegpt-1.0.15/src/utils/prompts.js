let one_shot_prompt = '';

const getCommandPrompt = (cleanPromptText, promptType, language) => {

    if (language == 'Spanish') {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Explica que hace este código: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Refactoriza este código y explica que cambios se hicieron: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Escribe nuevamente este código y agrega comentarios: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Encuentra los problemas del siguiente código, arréglalos y explica que estaba incorrecto: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Escribe un código en ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Escribe el código de pruebas unitarias del siguiente código: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == 'Portuguese') {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Explique o que esse código faz: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Otimize este código e explique quais alterações foram feitas: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Documente o seguinte código: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Encontre problemas com o código a seguir, corrija-os e explique o que estava errado: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Escreva um código em ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Escreva o código de teste de unidade para o seguinte código: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "English") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Explain what this code does: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Refactor this code and explain what's changed: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Document the following code: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Find problems with the following code, fix them and explain what was wrong: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Write a code in ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Write the unit test code for the following code: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "French") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Expliquez ce que fait ce code: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Refactorisez ce code et expliquez ce qui a changé: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Documentez le code suivant: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = `Trouvez des problèmes avec le code suivant, corrigez-les et expliquez ce qui n'allait pas: `;
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Écrivez un code dans ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Écrivez le code de test unitaire pour le code suivant: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if(language == "Japanese")
	{
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'このコードが何をするか説明してください ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `このコードをリファクタリングし、どのような変更が行われたかを説明します。 `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = '次のコードを文書化します。: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = '次のコードの問題を見つけて修正し、何が問題だったかを説明してください。 ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'にコードを書きます ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = '次のコードの単体テスト コードを記述します。 ';
				break;
			default:
					// código para ejecutar si expression no coincide con n ni con m
				break;
		}
		one_shot_prompt = one_shot_prompt + cleanPromptText;
	}
	else if(language == "Russian")
	{
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Объясните, что делает этот код: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Проведите рефакторинг этого кода и объясните, какие изменения были внесены: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Задокументируйте следующий код: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Найдите проблемы в следующем коде, исправьте их и объясните, что было не так: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Напишите код в ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Напишите код модульного теста для следующего кода: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if(language == "German")
	{
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Erklären Sie, was dieser Code bewirkt: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Überarbeiten Sie diesen Code und erklären Sie, welche Änderungen vorgenommen wurden: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Dokumentieren Sie den folgenden Code: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Finden Sie die Probleme im folgenden Code, beheben Sie sie und erklären Sie, was falsch war: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Schreiben Sie einen Code hinein ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Schreiben Sie den Einheitentestcode für den folgenden Code: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if(language == "Arabic")
	{
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'اشرح ما يفعله هذا الرمز: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `أعد تشكيل هذا الكود واشرح التغييرات التي تم إجراؤها: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'وثق الكود التالي: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'ابحث عن المشاكل في الكود التالي وقم بإصلاحها واشرح الخطأ: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'اكتب رمزًا ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'اكتب كود اختبار الوحدة للرمز التالي: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if(language == "Hebrew")
	{
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'הסבר מה הקוד הזה עושה: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `שחזר את הקוד הזה והסביר אילו שינויים בוצעו: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'כתוב את הקוד הזה שוב והוסף הערות: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'מצא את הבעיות בקוד הבא, תקן אותן והסבר מה השתבש: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'כתוב קוד ב ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'כתוב את קוד בדיקת היחידה עבור הקוד הבא: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "Thai") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'อธิบายว่ารหัสนี้ทำอะไร: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `ปรับโครงสร้างรหัสนี้ใหม่และอธิบายสิ่งที่เปลี่ยนแปลง: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'เอกสารรหัสต่อไปนี้: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'ค้นหาปัญหาเกี่ยวกับโค้ดต่อไปนี้ แก้ไขและอธิบายสิ่งที่ผิดพลาด: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'เขียนรหัสใน ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'เขียนรหัสการทดสอบหน่วยสำหรับรหัสต่อไปนี้: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "Chinese") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = '解释这段代码的作用：';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `重构此代码并解释更改内容：`;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = '记录以下代码：';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = '查找以下代码的问题，修复它们并解释错误所在：';
				break;
			case 'getCodeGPT':
				one_shot_prompt = '写一段代码进去 ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = '为以下代码编写单元测试代码：';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "Italian") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Spiega cosa fa questo codice: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Rifattorizza questo codice e spiega cosa è cambiato: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Documenta il seguente codice: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Trova i problemi con il seguente codice, correggili e spiega cosa non andava: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Scrivi un codice ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Scrivere il codice unit test per il seguente codice: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "Ukrainian") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Поясніть, що робить цей код: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Рефакторіть цей код і поясніть, що змінилося: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Задокументуйте наступний код: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Знайдіть проблеми з наступним кодом, виправте їх і поясніть, що не так: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Введіть код ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Напишіть код модульного тестування для такого коду: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "Polish") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Wyjaśnij, co robi ten kod: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Refaktoryzuj ten kod i wyjaśnij, co się zmieniło: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Udokumentuj następujący kod: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Znajdź problemy z następującym kodem, napraw je i wyjaśnij, co było nie tak: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'Wpisz kod w ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Napisz kod testu jednostkowego dla następującego kodu: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "Korean") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = '이 코드의 기능을 설명하십시오. ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `이 코드를 리팩터링하고 변경된 사항을 설명합니다. `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = '다음 코드를 문서화합니다. ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = '다음 코드에서 문제를 찾아 수정하고 무엇이 잘못되었는지 설명하십시오. ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = '에 코드 작성 ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = '다음 코드에 대한 단위 테스트 코드를 작성합니다. ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}
	else if (language == "Turkish") {
		switch (promptType) {
			case 'askCodeGPT':
				one_shot_prompt = '';
				break;
			case 'explainCodeGPT':
				one_shot_prompt = 'Bu kodun ne yaptığını açıklayın: ';
				break;
			case 'refactorCodeGPT':
				one_shot_prompt = `Bu kodu yeniden düzenleyin ve nelerin değiştiğini açıklayın: `;
				break;
			case 'documentCodeGPT':
				one_shot_prompt = 'Aşağıdaki kodu belgeleyin: ';
				break;
			case 'findProblemsCodeGPT':
				one_shot_prompt = 'Aşağıdaki kodla ilgili sorunları bulun, düzeltin ve neyin yanlış olduğunu açıklayın: ';
				break;
			case 'getCodeGPT':
				one_shot_prompt = 'içine bir kod yaz ';
				break;
			case 'unitTestCodeGPT':
				one_shot_prompt = 'Aşağıdaki kod için birim test kodunu yazın: ';
				break;
			default:
			// código para ejecutar si expression no coincide con n ni con m
		}
	}

	if(promptType == 'compileAndRunCodeGPT')
	{
		one_shot_prompt = `Act as if you were a console, if there is any error it shows the error message if there is not error then Compile and Execute the following code,  Then he explains in ${language} what happened in the execution:
		'''
		${cleanPromptText}
		'''
		Result:`;
	}
	else
	{
		one_shot_prompt = one_shot_prompt + cleanPromptText;
	}

	
    return one_shot_prompt;
}

module.exports = { getCommandPrompt }