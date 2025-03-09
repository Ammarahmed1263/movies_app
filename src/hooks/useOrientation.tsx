import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

const useOrientation = () => {
  const {width, height} = Dimensions.get('window');
  const [isPortrait, setIsPortrait] = useState(height >= width);

  useEffect(() => {
    const onChange = ({
      window: {width, height},
    }: {
      window: {width: number; height: number};
    }) => {
      setIsPortrait(height >= width);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, []);

  return {orientation: isPortrait ? 'portrait' : 'landscape', width, height};
};

export default useOrientation;
