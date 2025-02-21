
export const GetTopLevelBlockCoords = function (view) {
  const $pos = view.state.selection.$from;
  let from = $pos.before(1);
  let coords = view.coordsAtPos(from);
  return new DOMRect(
    coords.left,
    coords.top,
    coords.right - coords.left,
    coords.bottom - coords.top
  );
};

export const GetTableRowCoords = function (view) {
  const pos = view.state.selection.$from;
  let depth = pos.depth;
  while (depth > 1) {
    if (pos.node(depth).type.name == "tableRow") break;
    depth--;
  }
  let from = pos.before(depth);
  let rect = view.nodeDOM(from).getBoundingClientRect();
  return new DOMRect(rect.x, rect.y, rect.width, rect.height);
};

export const GetTableColumnCoords = function (view) {
  const pos = view.state.selection.$from;
  let depth = pos.depth,
    cellDepth = 0,
    tableDepth = 0;
  while (depth > 0) {
    if (
      pos.node(depth).type.name == "tableCell" ||
      pos.node(depth).type.name == "tableHeader"
    ) {
      cellDepth = depth;
    }
    if (pos.node(depth).type.name == "table") {
      tableDepth = depth;
      break;
    }
    depth--;
  }
  if (!(tableDepth && cellDepth)) {
    return false;
  }
  let cellRect = view.nodeDOM(pos.before(cellDepth)).getBoundingClientRect();
  let tableRect = view.nodeDOM(pos.before(tableDepth)).getBoundingClientRect();

  return new DOMRect(cellRect.x, tableRect.y, cellRect.width, tableRect.height);
};

export const GetTopLevelNode = function (view) {
  const selectionStart = view.state.selection.$from;
  if (selectionStart.node(1) == null && view.lastSelectedViewDesc) {
    return view.lastSelectedViewDesc.node;
  }
  return selectionStart.node(1);
};

export const GetNodeTree = function (view) {
  let nodes = [];
  let selectionStart = view.state.selection.$from;

  if (selectionStart.node(1) == null && view.lastSelectedViewDesc) {
    return [view.lastSelectedViewDesc.node.type.name];
  }

  let depth = selectionStart.depth;
  while (depth >= 0) {
    nodes.push(selectionStart.node(depth).type.name);
    depth--;
  }
  return nodes.reverse();
};

// export const GetTopLevelBlock = function (editor) {
//   const selectionStart = editor.view.state.selection.$from;
//   let parentNode = editor.view.domAtPos(selectionStart.posAtIndex(0, 1)).node;
//   if (parentNode == editor.view.dom) {
//     return editor.view.lastSelectedViewDesc?.nodeDOM;
//   }

//   // Sometimes we get a node that isn't the top-level parent; e.g. codeBlock gives us the <code> not the wrapping <pre>
//   while (
//     parentNode != editor.view.dom &&
//     parentNode.parentNode != editor.view.dom
//   ) {
//     parentNode = parentNode.parentNode;
//   }

//   return parentNode;
// };
