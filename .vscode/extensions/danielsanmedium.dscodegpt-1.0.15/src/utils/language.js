// function to detect a language
let comment_character = '//';

const detectLanguage = (languajeId) => {
    switch (languajeId) {
        case 'cpp':
            comment_character = '//';
            break;
        case 'c':
            comment_character = '//';
            break;
        case 'javascript':
            comment_character = '//';
            break;
        case 'javascriptreact':
            comment_character = '//';
            break;
        case 'terraform':
            comment_character = '#';
            break;
        case 'r':
            comment_character = '#';
            break;
        case 'go':
            comment_character = '//';
            break;
        case 'kotlin':
            comment_character = '//';
            break;
        case 'powershell':
            comment_character = '#';
            break;
        case 'typescriptreact':
            comment_character = '//';
            break;
        case 'typescript':
            comment_character = '//';
            break;
        case 'csharp':
            comment_character = '//';
            break;
        case 'python':
            comment_character = '#';
            break;
        case 'yaml':
            comment_character = '#';
            break;
        case 'json':
            comment_character = '//';
            break;
        case 'php':
            comment_character = '//';
            break;
        case 'c++':
            comment_character = '//';
            break;
        case 'java':
            comment_character = '//';
            break;
        case 'ruby':
            comment_character = '#';
            break;
        case 'html':
            comment_character = '<!--';
            break;
        case 'css':
            comment_character = '/*';
            break;
        case 'dart':
            comment_character = '//';
            break;
        case 'vue':
            comment_character = '//';
            break;
        case 'swift':
            comment_character = '//';
            break;
        case 'shellscript':
            comment_character = '#';
            break;
        case '':
            comment_character = false;
            break;
        default:
            comment_character = false;
            return;
    }

    return comment_character;
}

module.exports = { detectLanguage }