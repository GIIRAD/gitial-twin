import { Modal, ModalFooter, ModalHeader, ModalSection, Box, Stack, Button } from '@kiwicom/orbit-components';
import { OnChangeProps } from 'react-json-view';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { postAAS } from '../hooks/submodall';
import { putAAS } from '../hooks/getAAS';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const initialJsonDataTemperatur = {
  "modelType": "Submodel",
  "kind": "Instance",
  "semanticId": {
    "keys": [
      {
        "type": "Submodel",
        "value": "http://acplt.org/SubmodelTemplates/Temperature"
      }
    ],
    "type": "ExternalReference"
  },
  "administration": {
    "version": "1.0"
  },
  "id": "http://acplt.org/Submodels/Assets/ProductionMachine/Temperature",
  "description": [
    {
      "language": "en-us",
      "text": "A temperature submodel for monitoring the temperature of a production machine"
    },
    {
      "language": "de",
      "text": "Ein Temperatur-Submodell zur Überwachung der Temperatur einer Produktionsmaschine"
    }
  ],
  "idShort": "Temperature",
  "submodelElements": [
    {
      "modelType": "Property",
      "semanticId": {
        "keys": [
          {
            "type": "GlobalReference",
            "value": "http://acplt.org/Properties/Temperature"
          }
        ],
        "type": "ExternalReference"
      },
      "value": "22.5",
      "valueType": "xs:float",
      "category": "CONSTANT",
      "description": [
        {
          "language": "en-us",
          "text": "The current temperature of the production machine."
        },
        {
          "language": "de",
          "text": "Die aktuelle Temperatur der Produktionsmaschine."
        }
      ],
      "idShort": "CurrentTemperature",
      "unit": "Celsius"
    },
    {
      "modelType": "Property",
      "semanticId": {
        "keys": [
          {
            "type": "GlobalReference",
            "value": "http://acplt.org/Properties/TemperatureThreshold"
          }
        ],
        "type": "ExternalReference"
      },
      "value": "80.0",
      "valueType": "xs:float",
      "category": "CONSTANT",
      "description": [
        {
          "language": "en-us",
          "text": "The temperature threshold for the production machine."
        },
        {
          "language": "de",
          "text": "Die Temperaturgrenze für die Produktionsmaschine."
        }
      ],
      "idShort": "TemperatureThreshold",
      "unit": "Celsius"
    }
  ]
};

const JsonEditor: React.FC<{ jsonData: any, setJsonData: React.Dispatch<React.SetStateAction<any>> }> = ({ jsonData, setJsonData }) => {
  const handleEdit = (edit: OnChangeProps) => {
    setJsonData(edit.updated_src);
  };

  return (
    <div>
      <ReactJson
        src={jsonData}
        onEdit={handleEdit}
        onAdd={handleEdit}
        onDelete={handleEdit}
        theme="monokai"
        style={{ padding: '20px', borderRadius: '8px' }}
      />
    </div>
  );
};

type AddTemperaturProps = {
  onClose: () => void;
  aasId: string;
  aas: any;
}

const AddTemperatur: React.FC<AddTemperaturProps> = ({
  onClose, aasId, aas
}) => {
  const [jsonData, setJsonData] = useState(initialJsonDataTemperatur);

  const handleSubmit = async () => {
    // Ensure submodels is initialized as an array
    const submodels = Array.isArray(aas.submodels) ? aas.submodels : [];
    const newSubmodelId = jsonData.id;

    // Add the submodel reference to the AAS
    const newAAS = {
      ...aas,
      submodels: [...submodels, { id: newSubmodelId, idShort: jsonData.idShort }]
    };

    console.log(newAAS);

    try {
      // Add the submodel first
      await postAAS(jsonData);

      // Update the AAS to link the new submodel
      await putAAS(aasId, newAAS);

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Failed to add submodel and update AAS:', error);
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <ModalHeader title='Temperatur hinzufügen' />
      <ModalSection>
        <Box>
          <Stack>
            <JsonEditor jsonData={jsonData} setJsonData={setJsonData} />
          </Stack>
        </Box>
      </ModalSection>
      <ModalFooter>
        <Box display='inline-flex' width='full'>
          <Stack direction='row' align='center' justify='center'>
            <Button
              size='large'
              type='secondary'
              width='50%'
              onClick={() => {
                onClose();
              }}
            >
              Zurück
            </Button>
            <Button
              size='large'
              type='critical'
              width='50%'
              onClick={handleSubmit}
            >
              Absenden
            </Button>
          </Stack>
        </Box>
      </ModalFooter>
    </Modal>
  );
}

export default AddTemperatur;
