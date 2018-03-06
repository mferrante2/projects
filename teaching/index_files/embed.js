(function() {

    var host = 'https://infograph.venngage.com';

    function init() {
        // Prevent multiple Venngage embed scripts from running.
        // One script renders all embeds on the page.
        if (window.__venngage_embed_script_loaded) return;
        window.__venngage_embed_script_loaded = true;
        // Get all Venngage script elements. Convert HTMLCollection to Array.
        var scriptEls = [].slice.call(document.querySelectorAll('script[data-vg-id]'));

        // Get the script's hostname.
        host = getHost(scriptEls[0]);
        insertIframes(scriptEls);
        insertFooters(scriptEls);
    }

    function insertIframes(scriptEls) {
        scriptEls.forEach(function(current, i) {
            generateIframe(current);
        });
    }

    function insertFooters(scriptEls) {
        scriptEls.forEach(function(current, i) {
            // Check if the footer is enabled. It can be disabled by adding: data-f="false"
            if (getFooter(current)) {
                var footer = createFooter(
                    getTitle(current),
                    getSlug(current),
                    getID(current),
                    getWidth(current),
                    getFixed(current),
                    getMultipage(current));
                current.parentNode.insertBefore(footer, current);
            }
        });
    }

    function createWrapper(maxWidth) {
        var el = document.createElement('div');
        el.style.margin = '0 auto';
        el.style.position = 'relative';
        el.style.height = '0';
        el.style.overflow = 'hidden';
        el.style.maxWidth = maxWidth + 'px';
        el.style.paddingBottom = '100%';
        return el;
    }

    function generateIframe(el) {
        // Fixed iframe
        if (getFixed(el)) {
            var iframe = createFixedIframe(
                getID(el),
                getSlug(el),
                getWidth(el),
                getHeight(el),
                getBorder(el),
                getMultipage(el)
            );
            // Insert into DOM above this script element.
            el.parentNode.insertBefore(iframe, el);
        } // Responsive iframe
        else {
            var wrapper = createWrapper(getWidth(el));
            var iframe = createResponsiveIframe(
                getID(el),
                getSlug(el),
                getWidth(el),
                getBorder(el),
                getMultipage(el)
            );
            wrapper.appendChild(iframe);
            // Insert into DOM above this script element.
            el.parentNode.insertBefore(wrapper, el);
            initScaleEvents(wrapper, iframe, getWidth(el), getHeight(el));
        }
        if (getMultipage(el)) {
            initMultipageScrollToEmbed();
        }
    }

    function createResponsiveIframe(id, titleSlug, maxWidth, isBorder, isMultipage) {
        var el = document.createElement('iframe');
        el.src = getEmbedRoute(id, titleSlug, isBorder, false, isMultipage);
        el.style.position = 'absolute';
        el.style.top = '0';
        el.style.left = '0';
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.border = '0';
        el.style.overflow = 'hidden';
        el.style.maxWidth = maxWidth + 'px';
        return el;
    }

    function createFixedIframe(id, titleSlug, width, height, isBorder, isMultipage) {
        var el = document.createElement('iframe');
        el.src = getEmbedRoute(id, titleSlug, isBorder, true, isMultipage);
        el.style.display = 'block';
        el.style.width = width + 'px';
        el.style.height = height + 'px';
        el.style.border = '0';
        return el;
    }

    function createFooter(title, titleSlug, id, maxWidth, isFixed, isMultipage) {
        var wrapper = document.createElement('p');
        wrapper.style.boxSizing = 'border-box';
        wrapper.style.padding = '10px 2px';
        wrapper.style.color = 'rgb(224, 224, 224)';
        wrapper.style.fontSize = '12px';
        wrapper.style.textAlign = 'right';
        wrapper.style.margin = '0 auto';
        wrapper.style.maxWidth = maxWidth + 'px';
        if (isFixed) {
            wrapper.style.margin = '0';
            wrapper.style.width = maxWidth + 'px';
        }
        var infographLink = document.createElement('a');
        infographLink.href = getPublicRoute(id, titleSlug, isMultipage);
        infographLink.target = '_blank';
        infographLink.innerHTML = title;
        infographLink.style.color = 'rgb(221, 221, 221)';
        infographLink.style.fontStyle = 'italic';
        infographLink.style.textDecoration = 'none';
        infographLink.style.borderRight = '1px solid rgb(224, 224, 224)';
        infographLink.style.padding = '0 5px 0 0';
        var vgLink = document.createElement('a');
        vgLink.href = 'https://venngage.com';
        vgLink.target = '_blank';
        vgLink.innerHTML = 'Venngage Infographics';
        vgLink.style.color = 'rgb(221, 221, 221)';
        vgLink.style.fontStyle = 'italic';
        vgLink.style.textDecoration = 'none';
        vgLink.style.padding = '0 0 0 5px';
        // Append the links.
        wrapper.appendChild(infographLink);
        wrapper.appendChild(vgLink);
        return wrapper;
    }

    function initScaleEvents(wrapperEl, iframeEl, maxWidth, maxHeight) {
        var recalc = function() {
            iframeEl.contentWindow.postMessage(wrapperEl.offsetWidth, "*");
            wrapperEl.style.paddingBottom = wrapperEl.offsetWidth * maxHeight/maxWidth + "px";
        };
        iframeEl.addEventListener('load', recalc);
        window.addEventListener('resize', recalc);
    }

    // Init message event listener, which is callable by child iframes.
    // Scrolls to top of embed when event type is 'scrollToEmbed'.
    function initMultipageScrollToEmbed() {
        var scrollToEmbed = function(e) {
            if (e.data.type == 'scrollToEmbed') {
                document.querySelector('iframe[src*="' + e.data.embedId + '"]').scrollIntoView(true);
            }
        };

        if (window.addEventListener) {
            window.addEventListener('message', scrollToEmbed, false);
        }
    }

    function getHost(el) {
        return el.src.match('https?://[^/]*');
    }

    function getEmbedRoute(id, titleSlug, isBorder, isFixed, isMultipage) {
        if (isMultipage) {
            return host + '/pe/' + id + '?border=' + isBorder;
        }

        var eRoute = '/e3/';
        if (isFixed) eRoute = '/e/';
        return host + eRoute + id + '/' + titleSlug + '?border=' + isBorder;
    }

    function getPublicRoute(id, titleSlug, isMultipage) {
        return host + (isMultipage ? '/ps/' : '/p/') + id + '/' + titleSlug;
    }

    function getID(el) {
        return el.dataset.vgId;
    }

    function getTitle(el) {
        return el.dataset.title || 'Venngage';
    }

    function getSlug(el) {
        return sluggifyString(getTitle(el));
    }

    function getWidth(el) {
        var width = parseInt(el.dataset.w || 816, 10);
        if (getBorder(el)) width += 4;
        return width;
    }

    function getHeight(el) {
        var height = parseInt(el.dataset.h || 1056, 10);
        if (getBorder(el)) height += 4;
        return height;
    }

    function getBorder(el) {
        return el.dataset.b === 'true' ? true : false;
    }

    function getFooter(el) {
        return el.dataset.f === 'false' ? false : true;
    }

    function getFixed(el) {
        return el.dataset.fixed === 'true' ? true : false;
    }

    function getMultipage(el) {
        return el.dataset.multipage === 'true' ? true : false;
    }

    function sluggifyString(str) {
    	str = str.replace(/\s+/g, '-'); // replace all spaces with dashes
    	str = str.replace(/[^a-zA-Z0-9_-]/g, ''); // replace everything that's not a letter/number/underscore/dash with nothing
    	str = str.replace(/-{2,}/g, '-'); // replace multiple dashes with one
    	str = str.replace(/(^-)|(-$)/g, ''); // trim leading and trailing dashes
    	return str.toLowerCase();
    }

    window.addEventListener('load', init);

})();
