import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the playful achievement board with selected child summary', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Spring Learning Camp - ICMG/i })).toBeInTheDocument();
    expect(screen.getAllByText('Achievement Board')[0]).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Language' })).toBeInTheDocument();
    expect(screen.getByLabelText('Emir character, proud mood, gold medal')).toBeInTheDocument();
    expect(screen.getByText("Today's shining hero")).toBeInTheDocument();
  });
});
