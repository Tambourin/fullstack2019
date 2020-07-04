import React from 'react'
import { Grid, Button } from 'semantic-ui-react';

interface Props {
  onClose: () => void;
  dirty: boolean;
  isValid: boolean;
}

const FormButtons: React.FC<Props> = ({ onClose, dirty, isValid }) => {
  return (
    <Grid>
      <Grid.Column floated="left" width={5}>
        <Button type="button" onClick={onClose} color="red">
          Cancel
        </Button>
      </Grid.Column>
      <Grid.Column floated="right" width={5}>
        <Button
          type="submit"
          floated="right"
          color="green"
          disabled={!dirty || !isValid}
        >
          Add
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default FormButtons;