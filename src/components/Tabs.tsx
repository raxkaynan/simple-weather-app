import './Tabs.less';

export type TabsProps = {
  values: string[],
  selected: string,
  onChange: Function,
};

function Tabs({ values, selected, onChange }: TabsProps) {
  const handleClick = (value: string, idx: number) => {
    if (value !== selected) {
      onChange(idx);
    }
  };

  return (
    <div className="Tabs">
      {values.map((value, idx) => (
        <button
          className={selected === value ? 'selected' : ''}
          key={value}
          type="button"
          role="tab"
          onClick={() => handleClick(value, idx)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
