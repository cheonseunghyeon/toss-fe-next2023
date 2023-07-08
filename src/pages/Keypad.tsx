import React, { useEffect, useState } from 'react';
import colors from '_tosslib/constants/colors';
import { Button } from '_tosslib/components/Button';
import { createKeypad, CreateKeypad } from './remotes';
import { Txt } from '_tosslib/components/Txt';
const Keypad = () => {
  const [keypadData, setKeypadData] = useState<CreateKeypad | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createKeypad();
        setKeypadData(data);
      } catch (error) {
        console.error('Error fetching keypad data:', error);
      }
    };
    fetchData();
  }, []);

  if (!keypadData) {
    return <div>Loading keypad...</div>;
  }

  const { keypad } = keypadData;

  const renderKeypad = () => {
    const { functionKeys, size, svgGrid } = keypad;

    const keypadRows = [];
    for (let row = 0; row < size.rows; row++) {
      const keypadRow = [];
      for (let col = 0; col < size.columns; col++) {
        const functionKey = functionKeys.find(key => key.rowIndex === row && key.columnIndex === col);
        const svgMarkup = svgGrid[row][col];

        keypadRow.push(
          <Button
            key={`${row}-${col}`}
            variant="secondary"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
            style={{
              margin: '8px',
              width: '80px',
              height: '80px',
            }}
          />
        );
        if (row === 0 && col === 3) {
          keypadRow.push(
            <Button
              variant="secondary"
              style={{
                backgroundColor: '#E6F2FF',
                color: '#0066e2',

                margin: '8px',
                width: '80px',
                height: '80px',
              }}
            >
              ←
            </Button>
          );
        }
        // 8번째 위치에 버튼 삽입
        if (row === 1 && col === 3) {
          keypadRow.push(
            <Button
              variant="secondary"
              style={{
                backgroundColor: '#E6F2FF',
                color: '#0066e2',
                padding: '0px',
                margin: '8px',
                width: '80px',
                height: '80px',
              }}
            >
              전체삭제
            </Button>
          );
        }
      }
      keypadRows.push(
        <div
          key={row}
          style={{
            display: 'flex',
            alignItems: 'center', // 세로 중앙 정렬
          }}
        >
          {keypadRow}
        </div>
      );

      // 12번째 위치에 버튼 삽입
      if (row === 2) {
        keypadRow.push(
          <Button
            variant="secondary"
            style={{
              backgroundColor: '#0066E2',
              color: 'white',
              margin: '8px',
              width: '80px',
              height: '80px',
            }}
          >
            확인
          </Button>
        );
      }
    }

    return keypadRows;
  };

  return (
    <>
      <div
        style={{
          backgroundColor: colors.white,
          border: '1px solid ' + colors.grey300,
          borderRadius: '10px',
          padding: '16px',
        }}
      >
        {renderKeypad()}
        <Txt color={colors.grey700} style={{ margin: '8px' }}>
          비밀번호를 입력해주세요
        </Txt>
        <br />
        <Txt color={colors.grey700} style={{ margin: '8px', marginTop: '12px', marginBottom: '24px' }}>
          6자리로 입력해주세요
        </Txt>
      </div>
    </>
  );
};

export default Keypad;
