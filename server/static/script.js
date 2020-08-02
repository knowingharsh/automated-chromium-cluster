function hello() {
    return 'hello ';
}


/* 
    executeHell method will automatically be executed and data would be returned back
*/
function executeHell({ urlData }) {
    return {
        title: document.title,
        useUrlData: hello() + urlData.name
    };
}



