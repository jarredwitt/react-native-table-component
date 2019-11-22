import React, { Component } from 'react';
import { View, ViewPropTypes, Text, StyleSheet } from 'react-native';

export class Cell extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    borderStyle: ViewPropTypes.style
  };

  static defaultProps = {
    onLayout: () => true,
  }

  state = {
    rendered: false,
  }

  onLayout = e => {
    if (this.state.rendered) {
      return;
    }

    this.props.onLayout(e)

    this.setState({rendered: true});
  };

  render() {
    const { data, width, height, flex, style, textStyle, borderStyle, ...props } = this.props;
    const textDom = React.isValidElement(data) ? (
      data
    ) : (
      <Text style={[textStyle, styles.text]} {...props}>
        {data}
      </Text>
    );

    return (
      <View
        onLayout={this.onLayout}
        style={[
          styles.cell,
          width && { width },
          height && { height },
          flex && { flex },
          !width && !flex && !height && !style && { flex: 1 },
          style
        ]}
      >
        {textDom}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: { justifyContent: 'center' },
  text: { backgroundColor: 'transparent' }
});
