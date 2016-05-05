import React, { Component, PropTypes } from 'react';
import except from 'except';

const FlexableElement = ({
    _key,
    id,
    className,
    children,
    _children,
    style,
    transformChildren,
    text,
    generateChildKey,
    omitProps,
    ...remainingProps
}) => {
    let kids = children ? children : _children;
    let _transformChildren = transformChildren;
    const passthroughProps = except(remainingProps, [...omitProps]);

    if (!_transformChildren) {
        if (generateChildKey) {
            _transformChildren = () => React.Children.map(kids, (c,i) => React.cloneElement(c, { key: generateChildKey(_key, i), ...passthroughProps }));
        } else {
            _transformChildren = () => React.Children.map(kids, c => React.cloneElement(c, passthroughProps))
        }
    }

    const transformedChildren = _transformChildren(kids, passthroughProps);

    return (
        <div id={id} key={_key} style={style} className={className}>
            { React.Children.count(kids) > 0 ? transformedChildren : text }
        </div>
    );
};

FlexableElement.propTypes = {
    _key: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    text: PropTypes.any,
    omitProps: PropTypes.array,
    transformChildren: PropTypes.func,
    generateChildKey: PropTypes.func
};

FlexableElement.defaultProps = {
    text: '',
    style: Object.create(null),
    omitProps: [],
    className: ''
};

export default FlexableElement;
