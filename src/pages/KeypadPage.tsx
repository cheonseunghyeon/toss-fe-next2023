import React, { useState } from 'react';
import { Button } from '_tosslib/components/Button';
import { Input } from '_tosslib/components/Input';
import { Spacing } from '_tosslib/components/Spacing';
import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import Keypad from './Keypad';

export function KeypadPage() {
  const [showKeypad1, setShowKeypad1] = useState(false);
  const [showKeypad2, setShowKeypad2] = useState(false);

  const handleFocus1 = () => {
    setShowKeypad1(true);
  };

  const handleBlur1 = () => {
    setShowKeypad1(false);
  };

  const handleFocus2 = () => {
    setShowKeypad2(true);
  };

  const handleBlur2 = () => {
    setShowKeypad2(false);
  };

  return (
    <section>
      <Txt typography="h1" color={colors.black}>
        토스 보안키패드 기술과제
      </Txt>
      <div style={{ position: 'relative' }}>
        <Input label="비밀번호">
          <Input.TextField onFocus={handleFocus1} onBlur={handleBlur1} />
        </Input>
        {showKeypad1 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}>
            <Keypad />
          </div>
        )}
      </div>
      <Spacing size={24} />
      <div style={{ position: 'relative' }}>
        <Input label="비밀번호 확인">
          <Input.TextField onFocus={handleFocus2} onBlur={handleBlur2} />
        </Input>
        {showKeypad2 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}>
            <Keypad />
          </div>
        )}
      </div>
      <Spacing size={24} />
      <Button css={{ width: '100%' }}>완료</Button>
    </section>
  );
}
