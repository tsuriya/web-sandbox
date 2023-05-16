function* getElementsByXPathIterator (node, xpath) {
    const items = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(let ii = 0,ll = items.snapshotLength; ii < ll; ii++)yield items.snapshotItem(ii);
}

function* getCharStyleListIterator (node) {
    const regWhiteSpace = /[ \n\r\t]/;
    for (const parentNode of getElementsByXPathIterator(node, "*//text()/parent::*")) {
        const parentRect = parentNode.getBoundingClientRect();
        if (parentRect.width === 0 || parentRect.height === 0)continue;
        let beforeCharNode = null;
        const parentStyle = getComputedStyle(parentNode);
        const chars = [];

        for (const textNode of getElementsByXPathIterator(parentNode, "text()")) {
            const char = textNode.textContent;
            if (char.length === 0 || char.length === 1)continue;
            let init = true;
            textNode.textContent.split("").forEach((char, ii)=>{
                if(char.length === 0)return;
                if(regWhiteSpace.test(char))return;
                const charNode = document.createTextNode(char);
                if (init) {
                    parentNode.replaceChild(charNode, textNode);
                    init = false;
                } else {
                    parentNode.insertBefore(charNode, beforeCharNode.nextSibling);
                }
                
                beforeCharNode = charNode;
            });
        }

        for (const charNode of getElementsByXPathIterator(parentNode, "text()")) {
            const char = charNode.textContent;
            if(char.length === 0)continue;
            if(regWhiteSpace.test(char))continue;
            const range = document.createRange();
            range.selectNode(charNode);
            const charRect = range.getBoundingClientRect();
            chars.push({
                "char" : char,
                "rect" : {
                    "height": charRect.height,
                    "width": charRect.width,
                    "x": charRect.x,
                    "y": charRect.y,
                }
            });
        }

        if (chars.length === 0)continue;
        yield {
            "element" : parentNode,
            "font" : parentStyle.font,
            "color" : parentStyle.color,
            "rect" : {
                "height": parentRect.height,
                "width": parentRect.width,
                "x": parentRect.x,
                "y": parentRect.y,
            },
            "chars" : chars
        };
    }
}

