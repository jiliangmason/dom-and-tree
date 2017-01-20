/**
 * Created by Administrator on 2017/1/19.
 */
function tree_node(obj) {
    this.parent = obj.parent;
    this.childs = obj.childs || []; // 如果obj有childs就赋值，如果没有就用[]
    this.data = obj.data || "";
    this.selfElement = obj.selfElement;
    this.selfElement.tree_node = this; //ex: root.tree_node({...}); root = this; root.selfElement.tree_node = root
} //构造函数

//tree_node.prototype = {
    
    //constructor: tree_node,
    /*改变箭头、可视性等*/
    tree_node.prototype.render = function (arrow, visible, tohighlight, delhighlight) {
        if (arguments.length < 3)
        {
            tohighlight = false;
            delhighlight = false;
        }
        if (arrow)
        {
            if (this.is_leaf())
            {
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow empty-arrow";
            }
            else if (this.is_folded())
            {
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow right-arrow";
            }
            else
            {
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow down-arrow";
            }
        }

        if (visible)
        {
            if (this.selfElement.className.indexOf("nodebody-visible") === -1)
            {
                this.selfElement.className = this.selfElement.className.replace("hidden", "visible");
            }
            else
            {
                this.selfElement.className = this.selfElement.className.replace("visible", "hidden");
            }
        }

        if (tohighlight)
        {
            this.selfElement.getElementsByClassName('node-title')[0].className = "node-title node-title-highlight";
        }

        if (delhighlight)
        {
            this.selfElement.getElementsByClassName('node-title')[0].className = "node-title";
        }
    };

        tree_node.prototype.is_leaf = function () {
        return this.childs.length === 0;
    };

        tree_node.prototype.is_folded = function () {
        if (this.is_leaf())
            return false;
        if (this.childs[0].selfElement.className === 'nodebody-visible')
            return false;

        return true;
    };


        tree_node.prototype.delete_node = function () {
        var i;
        //不是叶子结点
        if (!this.is_leaf())
        {
            for (i = 0; i < this.childs.length; i++)
            {
                this.childs[i].delete_node();
            }
        } //先删除待删除结点的子结点
        this.parent.selfElement.removeChild(this.selfElement); //再删自己
        for (i = 0; i < this.parent.childs.length; i++)
        {
            if (this.parent.childs[i] == this)
            {
                this.parent.childs.splice(i, 1); //删除从i开始的1个元素，就是childs[i]本身
                break;
            }
        } //把这个结点从它的父节点的childs里面删除

        this.parent.render(true, false);
    };

        tree_node.prototype.add_child = function (text) {
        if (text == null) return this;
        if (text.trim() == "")
        {
            alert("输入不能为空");
            return;
        }
        if (!this.is_leaf() && this.is_folded())
        {
            this.toggle_fold();
        }

        var new_node = document.createElement('div');
        new_node.className = "nodebody-visible";

        var new_header = document.createElement('label');
        new_header.className = "node-header";

        var new_symbol = document.createElement('div');
        new_symbol.className = "arrow empty-arrow";

        var new_title = document.createElement('span');
        new_title.className = "node-title";
        new_title.innerHTML = text;

        var space = document.createElement('span');
        space.innerHTML = "&nbsp;&nbsp";

        var new_delete = document.createElement('img');
        new_delete.className = "deleteIcon";
        new_delete.src = "images/delete.png";

        var new_add = document.createElement('img');
        new_add.className = "addIcon";
        new_add.src = "images/add.png";

        new_header.appendChild(new_symbol);
        new_header.appendChild(new_title);
        new_header.appendChild(space);
        new_header.appendChild(new_add);
        new_header.appendChild(new_delete);
        new_node.appendChild(new_header);

        this.selfElement.appendChild(new_node); //this代表当前结点，this.selefElement代表document.getElementByClassName('nodebody-visible')[i]

        this.childs.push(new tree_node({
            parent: this, //添加的这个结点的父结点就是this
            childs: [], // 添加的结点且没有子节点
            data: text,
            selfElement: new_node //插入的子结点就是new_node
        }));

        this.render(true, false); //渲染当前的结点

        return this;
    };

        tree_node.prototype.toggle_fold = function () {
        if (this.is_leaf()) return this;
        for (var i = 0; i < this.childs.length; i++)
        {
            this.childs[i].render(false, true); //结点展开以后它的子节点前面没有箭头，但是一定要可见
        }

        this.render(true, false); //本节点需要箭头
        return this;
    };
    
//}; //重写原型对象

//根结点所对应的对象
var root = new tree_node({
    parent: null,
    childs: [],
    data: "前端工程师",
    selfElement: document.getElementsByClassName('nodebody-visible')[0]
});

root.selfElement.addEventListener("click", function (e) {
    var target = e.target || e.srcElement;
    var dom_node = target;
    while (dom_node.className.indexOf("nodebody") === -1)
    {
        dom_node = dom_node.parentNode;
    } //dom_node为点击事件的发生点最外层的div

    if ((target.className.indexOf("node-title") !== -1) || (target.className.indexOf("arrow") !== -1))
    {
        dom_node.tree_node.toggle_fold();
    } //点在文字上或者箭头上

    else if (target.className === 'addIcon')
    {
        dom_node.tree_node.add_child(prompt("请输入结点的内容："));
    }

    else if (target.className === 'deleteIcon')
    {
        dom_node.tree_node.delete_node();
    }
});


root.search = function (query) {

    var tree_list = [];
    var queue = [];
    var current = this;
    if (current)
    {
        queue.push(current);
    }
    while (queue.length > 0)
    {
        current = queue.shift();
        current.render(false, false, false, true);
        if (current.data === query)
        {
            tree_list.push(current);
        }
        for (var i = 0; i < current.childs.length; i++)
        {
            queue.push(current.childs[i]);
        }
    }

    return tree_list;
};

document.getElementById("search-btn").addEventListener("click", function () {
    var text = document.getElementById("search").value.trim();
    if (text === "")
    {
        document.getElementById("result").innerHTML = "请输入查询内容!";
        return;
    }

    var result_list = root.search(text);
    if (result_list.length === 0)
    {
        document.getElementById("result").innerHTML = "没有查询到结果";
    }
    else
    {
        document.getElementById("result").innerHTML = "查询到" + result_list.length + "个符合条件的结点";
        var path_node;
        for (var i = 0; i < result_list.length; i++)
        {
            path_node = result_list[i];
            path_node.render(false, false, true, false);
            while (path_node.parent)
            {
                if (path_node.selfElement.className === 'nodebody-hidden')
                {
                    path_node.parent.toggle_fold(); //遇到收缩的需要展开
                }
                path_node = path_node.parent; // 不断的展开
            }
        }
    }
});

document.getElementById("delete-btn").addEventListener("click", function () {
    document.getElementById("search").value = "";
    root.search(null);
    document.getElementById("result").innerHTML = "";
});

/*Demo*/
root.add_child("技术").add_child("IT公司").add_child("梦想");
root.childs[0].add_child("HTML5").add_child("CSS3").add_child("Javascript").add_child("PHP").add_child("React.js").toggle_fold();
root.childs[0].childs[4].add_child("Webpack").toggle_fold();
root.childs[1].add_child("百度").add_child("腾讯").add_child("阿里");
root.childs[2].add_child("前端程序员").add_child("足球运动员").toggle_fold();

document.getElementById('search').value = "搜一搜";
document.getElementById('search').addEventListener("click", function () {
    this.value = "";
});