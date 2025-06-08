import React from 'react';
import classNames from 'classnames';

const PinDigit = (props) => {
  const [hidden, setHiddenTo] = React.useState(false);

  React.useEffect(() => {
    if (props.value) {
      const timeout = setTimeout(() => {
        setHiddenTo(true);
      }, 500);

      return () => {
        setHiddenTo(false);
        clearTimeout(timeout);
      };
    }
  }, [props.value]);

  return (
    <div
      className={classNames("app-pin-digit", {
        focused: props.focused,
        hidden
      })}
    >
      <span className="app-pin-digit-value">{props.value || ""}</span>
    </div>
  );
};

export default PinDigit;