import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from './Tabs';

it('renders tabs', () => {
  render(<Tabs values={['tab1', 'tab2', 'tab3']} selected="tab1" onChange={() => {}} />);
  const tabs = screen.getAllByRole('tab');

  expect(tabs[0]).toHaveTextContent(/tab1/i);
  expect(tabs[1]).toHaveTextContent(/tab2/i);
  expect(tabs[2]).toHaveTextContent(/tab3/i);
});

it('calls onChange when tab changes', () => {
  const mockHandleTabChange = jest.fn();
  render(<Tabs values={['tab1', 'tab2', 'tab3']} selected="tab1" onChange={mockHandleTabChange} />);
  const tab = screen.getByRole('tab', { name: /tab3/i });
  userEvent.click(tab);

  expect(mockHandleTabChange).toHaveBeenCalledWith(2);
});
