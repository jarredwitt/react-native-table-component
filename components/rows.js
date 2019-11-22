import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text, StyleSheet } from 'react-native';
import { Cell } from './cell';
import { sum } from '../utils';

export class Row extends Component {
  static propTypes = {
    cellRenderer: PropTypes.func,
    rowIndex: PropTypes.number,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  cellRenderer = (item, i) => {
    const { cellRenderer, widthArr, height, flexArr, rowIndex, textStyle, ...props } = this.props;
  
    const flex = flexArr && flexArr[i];
    const wth = widthArr && widthArr[i];

    if (cellRenderer) {
      return cellRenderer({
        item,
        index: i,
        rowIndex,
        flex,
        textStyle,
        width: wth,
      });
    }

    return <Cell key={i} data={item} width={wth} height={height} flex={flex} textStyle={textStyle} {...props} />;
  }

  render() {
    const { data, style, widthArr, height, flexArr, textStyle, ...props } = this.props;
    let width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[height && { height }, width && { width }, styles.row, style]}>
        {data.map(this.cellRenderer)}
      </View>
    ) : null;
  }
}

export class Rows extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
    const flex = flexArr ? sum(flexArr) : 0;
    const width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          console.log(i)
          return (
            <Row
              key={i}
              data={item}
              widthArr={widthArr}
              height={height}
              flexArr={flexArr}
              style={style}
              textStyle={textStyle}
              rowIndex={i}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  }
});
