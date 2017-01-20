/**
 * Created by Administrator on 2017/1/18.
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

var select_div;

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

function init() {

    var levels = document.getElementsByTagName('div');
    for (var i = 0; i < levels.length; i++)
    {
        levels[i].addEventListener("click", function (e) {
            reset();
            this.style.backgroundColor = "deeppink";
            e.stopPropagation();
            select_div = this ;
            return select_div;
        });
    }
}

function del_node(select_div) {
    if (select_div === undefined)
    {
        alert("请选中有效结点");
    }
    else
    {
        var parent = select_div.parentNode;
        parent.removeChild(select_div);
    }
}

function insert_node(select_div) {
    var content = $('add').value.trim();
    if (content === "")
    {
        alert("请输入需要插入的值");
    }
    else if (content === undefined)
    {
        alert("请输入有效结点");
    }
    else
    {
        var new_div = document.createElement('div');
        new_div.textContent = content;
        select_div.appendChild(new_div);
        new_div.className = "new";

        var levels = document.getElementsByTagName('div');
        for (var i = 0; i < levels.length; i++)
        {
            levels[i].addEventListener("click", function (e) {
                reset();
                this.style.backgroundColor = "deeppink";
                e.stopPropagation();
                select_div = this;
            });
        }
    }
}

window.onload = function () {

    init();

    $('search').onfocus = function () {
        this.value = "";
    };

    $('map-btn').addEventListener("click", function () {
        $('search').value = "";
        pre_find(root);
    });

    $('search-btn').addEventListener("click", function () {
       pre_find(root);
    });

    $('delete-btn').addEventListener("click", function () {
        del_node(select_div);
    });
    
    $('add-btn').addEventListener("click", function () {
        insert_node(select_div);
    });

};