import { render, screen } from '@/utils/test-utils';
import FormFieldContainer from './form-field-container';

describe('FormFieldContainer', () => {
  it('should render', () => {
    render(
      <FormFieldContainer label="Some Label" name="field-name">
        component children
      </FormFieldContainer>,
    );
  });

  it('should have matched label and render children', () => {
    render(
      <FormFieldContainer label="Some Label" name="field-name">
        <input type="text" id="field-name" value="input value" />
      </FormFieldContainer>,
    );
    expect(screen.getByLabelText('Some Label')).toHaveDisplayValue(
      'input value',
    );
  });
});
