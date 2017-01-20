/**
 * Created by Administrator on 2017/1/16.
 */
var btn = document.getElementsByTagName('input');
var pre_btn = btn[0];
var middle_btn = btn[1];
var post_btn = btn[2];
var root = document.getElementsByClassName('root')[0];
var tree_list = [];
var timer = null;

window.onload = function () {
    pre_btn.onclick = function () {
        reset();
        pre_order(root);
        change_color();
    };

    middle_btn.onclick = function () {
        reset();
        middle_order(root);
        change_color();
    };

    post_btn.onclick = function () {
        reset();
        post_order(root);
        change_color();
    };

};

function pre_order(node) {
    if (node != null)
    {
        tree_list.push(node);
        pre_order(node.firstElementChild);
        pre_order(node.lastElementChild);
    }

}

function middle_order(node) {
    if (node != null)
    {
        middle_order(node.firstElementChild);
        tree_list.push(node);
        middle_order(node.lastElementChild);
    }

}

function post_order(node) {
    if (node != null)
    {
        post_order(node.firstElementChild);
        post_order(node.lastElementChild);
        tree_list.push(node);
    }

}

function change_color() {
    var i = 0;
    tree_list[i].style.color = 'pink';
    timer = setInterval(function () {
        i++;
        if (i < tree_list.length)
        {
            tree_list[i].style.backgroundColor = 'pink';
            tree_list[i - 1].style.backgroundColor = 'white';
        }
        else
        {
            clearInterval(timer);
            tree_list[i].style.backgroundColor = 'white';
        }

    }, 500);

}

function reset() {
    tree_list = [];
    clearInterval(timer);
    var div_element = document.getElementsByTagName('div');
    for (var i = 0; i < div_element.length; i++)
    {
        div_element[i].style.backgroundColor = 'white';
    }
}

