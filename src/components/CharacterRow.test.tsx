import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { achievements } from '../data/achievements';
import { children } from '../data/children';
import { CharacterRow } from './CharacterRow';

describe('CharacterRow', () => {
  it('renders all children on the shared stage', () => {
    render(
      <CharacterRow
        childrenList={children}
        achievements={achievements}
        selectedChildId={children[0]!.id}
        onSelectChild={() => undefined}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(children.length);
    children.forEach((child) => {
      expect(screen.getByTestId(`character-column-${child.id}`)).toBeInTheDocument();
      expect(screen.getByText(child.name)).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Children achievement avatars')).toBeInTheDocument();
  });
});
