/**
 * Created by Administrator on 2017/1/17.
 */
var tree_list = [];
var $ = function (id) {
    return document.getElementById(id);
};
var start_time = 0;
var end_time = 0;
var head = null;
var text = "";
var found = false;
var timer = null;
var root = document.getElementsByClassName('root')[0];

function pre_find(node) {
    reset();
    (function dfs(node) {
        var pnode = null;
        if (node != null)
        {
            tree_list.push(node);
            dfs(node.firstElementChild);
            if (node.firstElementChild != null)
            {
                pnode = node.firstElementChild.nextElementSibling;
                while (pnode)
                {
                    dfs(pnode);
                    pnode = pnode.nextElementSibling;
                }
            }
        }

    })(node);
        render();
}

function middle_find(node) {
    reset();
    (function dfs(node) {
        var pnode = null;
        if (node != null)
        {
            dfs(node.firstElementChild);
            tree_list.push(node);
            if (node.firstElementChild != null)
            {
                pnode = node.firstElementChild.nextElementSibling;
                while (pnode)
                {
                    dfs(pnode);
                    pnode = pnode.nextElementSibling;
                }
            }
        }
    })(node);
    render();
}

function post_find(node) {
    reset();
    (function dfs(node) {
        var pnode = null;
        if (node != null)
        {
            dfs(node.firstElementChild);
            if (node.firstElementChild != null)
            {
                pnode = node.firstElementChild.nextElementSibling;
                while (pnode)
                {
                    dfs(pnode);
                    pnode = pnode.nextElementSibling;
                }
            }
            tree_list.push(node);
        }
    })(node);
    render();
}

function bfs_find(node) {
    reset();
    (function bfs(node) {
        var queue = [];
        var pnode = null;
        if (node != null)
        {
            queue.push(node);
        }
        while (queue.length > 0)
        {
            pnode = queue.shift();
            tree_list.push(pnode);
            if (pnode.firstElementChild)
            {
                queue.push(pnode.firstElementChild);
                pnode = pnode.firstElementChild;
                while (pnode.nextElementSibling)
                {
                    queue.push(pnode.nextElementSibling);
                    pnode = pnode.nextElementSibling;
                }
            }
        }
    })(node);
    render();
}

function reset() {
    if (tree_list.length > 0)
    {
        start_time = 0;
        end_time = 0;
        tree_list = [];
        found =false;
        text = "";
        head.style.backgroundColor = "white";
        clearTimeout(timer);
    }
}

function search_show() {
    if (tree_list.length === 0 && !found)
    {
        alert("Not Found");
    }
    head = tree_list.shift();

    if (head)
    {
        <!--text=head.nodeValue firstChild包含了里面的文本-->
        text = head.firstChild.nodeValue;
        if (text.trim() === $('search').value)
        {
            head.style.backgroundColor = "deeppink";
            found = true;
            end_time = new Date();
            alert("本次查询时间：" + (end_time - start_time)/1000 + "s");
        }
        else
        {
            head.style.backgroundColor = "lightgreen";
            timer = setTimeout(function () {
                head.style.backgroundColor = "white";
                search_show();
            }, 500);
        }
    }
}

function only_show() {
    head = tree_list.shift();
    if (head)
    {
        head.style.backgroundColor = "#6fa3ff";
        timer = setTimeout(function () {
            head.style.backgroundColor = "white";
            only_show();
        }, 500);
    }
}

function render() {
    if ($('search').value !== "")
    {
        search_show();
    }
    else
    {
        only_show();
    }
}


window.onload = (function () {
    $('search').onfocus = function () {
        this.value = "";
    };

    $('pre-find').addEventListener("click", function () {
        start_time = new Date();
        pre_find(root);
    });

    $('middle-find').addEventListener("click", function () {
        start_time = new Date();
        middle_find(root);
    });

    $('post-find').addEventListener("click", function () {
        start_time = new Date();
        post_find(root);
    });

    $('bfs-find').addEventListener("click", function () {
        start_time = new Date();
        bfs_find(root);
    });


})();