import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

const HEADER_HEIGHT = height / 1.9;
const SNAP_POINTS = [0, -HEADER_HEIGHT];


export { width, height, HEADER_HEIGHT, SNAP_POINTS , horizontalScale as hs, verticalScale as vs, moderateScale as ms};