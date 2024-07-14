import Background from '@/components/common/common-styled-components';
import { Layout, Box, Stack, Button, Text, defaultTheme, Heading, TextLink } from '@kiwicom/orbit-components';
import React, { useState } from 'react'
import Image from 'next/image';
import Bild from '../public/image.png';
import dynamic from 'next/dynamic';
import { OnChangeProps, JsonView } from 'react-json-view'
import { useRouter } from 'next/router';
import fetchPost from '@/components/utils/http/post';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const initialJsonData = {
  "modelType": "AssetAdministrationShell",
  "assetInformation": {
    "assetKind": "Instance",
    "globalAssetId": "https://acplt.org/Test_Asset"
  },
  "derivedFrom": {
    "keys": [
      {
        "type": "AssetAdministrationShell",
        "value": "https://acplt.org/TestAssetAdministrationShell"
      }
    ],
    "type": "ExternalReference"
  },
  "administration": {
    "revision": "9",
    "version": "0"
  },
  "id": "https://acplt.org/Test_AssetAdministrationShell",
  "description": [
    {
      "language": "en-us",
      "text": "An Example Asset Administration Shell for the test application"
    },
    {
      "language": "de",
      "text": "Ein Beispiel-Verwaltungsschale für eine Test-Anwendung"
    }
  ],
  "idShort": "TestAssetAdministrationShell"
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

const createAAS = () => {
  const router = useRouter();
  const [jsonData, setJsonData] = useState(initialJsonData);

  const registerAAS = async () => {
    const response = await fetchPost('http://localhost:8081/shells', jsonData);
    console.log(response);
  };

  return (
    <Background color={defaultTheme.orbit.paletteCloudLight}>
      <Layout type='MMB'>
        <Box margin={{ top: 'XXXLarge' }}>
          <Stack direction='column' spacing='medium' >
            <Heading type='title1'>
              Hier können Sie eine Verwaltungsschale anlegen
            </Heading>
          </Stack>
          <Box margin={{ top: 'XLarge' }}>
            <Stack direction='column' spacing='small'>
              <Box>
                <Stack spaceAfter='small'>
                  <Text>Um ein AAS anlegen zu können müssen Sie dem System mitteilen welche Eigenschaften es hat.</Text>
                  <Text>Wir haben für Sie exemplarisch schon mal eine Json Vorbereitet mit Exenplarischen Werten</Text>
                  <Text>Sie müssen nur noch die benötigten Werte anpassen für die Maschine um ein AAS anlegen zu können</Text>
                  <Text>Bedenken Sie das "modelType", "id" und "idShort" einzigartig seien müssen um das AAS anlegen zu können</Text>
                </Stack>
              </Box>
              <Box>
                <Stack spacing='small'>
                  <JsonEditor jsonData={jsonData} setJsonData={setJsonData} />
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box margin={{ top: 'XLarge' }}>
            <Stack direction='column' spacing='small'>
              <Text>Wenn Sie fertig sind können Sie das AAS anlegen</Text>
              <Button
                onClick={() => {
                  registerAAS();
                  router.push('/');
                }}
              >
                AAS anlegen
              </Button>
            </Stack>
          </Box>
          <Box margin={{ top: 'XLarge' }}>
            <Stack direction='column' spacing='small'>
              <Text>Alternativ können Sie das auch im Registry and Discovery Interface machen</Text>
              <Text>Hierzu öffnen sie <TextLink>http://localhost:8081/swagger-ui/index.html</TextLink></Text>
              <Text>Im Asset Administration Shell Repository API finden Sie die Route um ein AAS anlgegen zu können über HTTP-Post</Text>
              <Text>Mit dem click auf "Try out" können Sie die Route testen über die Swagger ui</Text>
              <Text>Hier müssen sie nun die bereitgestellte json für ein AAS bearbeiten und mit dem Klick auf "Execute" legen Sie ein neues an</Text>
              <Text>Wenn Sie die Json hier bearbeiten möchten können sie Json kopieren</Text>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(jsonData));
                }}
              >
                Json kopieren
              </Button>
            </Stack>
          </Box>
        </Box>
      </Layout>
    </Background>
  )
}

export default createAAS;