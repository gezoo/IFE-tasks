function traverseNode(parentNode ,searchValue, callback) {


    this.queue = [];
    function preOrder(node) {
        if (searchValue === node.textContent) {
            callback();
        }        
        if (node.children.length != 0) {
            for (var i = 0; i < node.children.length; i++) {
                preOrder(node.children[i]);
            }
        }
    }

    function search() {
        preOrder(parentNode);
    }
}