# DOM 和 树形结构
/***********************************task025*******************************************/
html:
1、采用了给每个元素添加样式的方法，tree-body下面有许多个标签为nodebody-visible的div，每个div块下面还有多个子div块
每个div块下面的class属性有arrow箭头、node-title选项名字、addIcon/deleteIcon添加删除符号

css：
设计思路：对于元素尽量使用添加class属性来改变特效

1、tree-module：display inline-block有了这个属性框子就不会独占一行，position和left一起用使得框位于最中间
2、nodebody：display：flex属性
3、向右的箭头
.right-arrow {
    width: 0px;
    height: 0px;
    border-left: 10px solid #6898c2;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    cursor: pointer;
}
向下的箭头：
.down-arrow {
    width: 0px;
    height: 0px;
    border-top: 10px solid #6898c2;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    cursor: pointer;
}
---------- 他们的宽和高都是0px

js: 组合构造函数
构造函数：
function tree_node(){
	最重要的地方：this.selfElement.tree_node = this; //没有这个所有的箭头都失灵
}

childs[tree_node1, tree_node2, .....] 其中每个tree_node就是一个结构
add_child函数：
如果是root.add_child("xxx") 那么this = root
先要把创建好的new_node放入到this.selfElement下面，然后在把new_node加入到root的childs数组里面。

给root.selfElement绑定点击事件函数里面，dom_node.tree_node.toggle_fold()，里面的dom_node只是一个tree_node结构当中
的selfElement属性，直接用dom_node.toggle_fold()会找不到，所以有了最开始那个重要的地方

prompt("请输入结点的内容：")函数用法

root.search = function (query) 给root绑定一个search函数，可以自己命名

深度优先搜索：
current = this; //this = root
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

找到需要查询的结点：不断展开
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

整个构造函数：
1、render渲染
2、is_leaf判断是否为叶子结点
3、is_fold判断是否为折叠结点
4、delete_node 删除结点
5、add_child 添加结点
6、toggle_fold 展开

为各节点绑定事件：
1、点在字体或者箭头
2、点添加/删除标记


为搜索按钮绑定事件
为删除按钮绑定事件
/*************************************************task025*******************************************/