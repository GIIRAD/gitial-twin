import React, { useEffect, useState } from 'react';
import { defaultTheme, Layout, LayoutColumn, Text, Heading, Box, Stack, TextLink, Button } from '@kiwicom/orbit-components';
import Background from '@/components/common/common-styled-components';
import { useRouter } from 'next/router';
import { getAAS } from '@/components/hooks/getAAS';
import AddTemperatur from '@/components/modals/addSubmodellTemperatur';
import AddVibration from '@/components/modals/addSubmodellVibration';
import AddHours from '@/components/modals/addSubmodellhours';

const Aas = () => {
  const router = useRouter();
  const { aasId } = router.query;

  const [aas, setAas] = useState<any | null>(null);
  const [openAddTemperaturModal, setOpenAddTemperaturModal] = useState(false);
  const [openAddVibrationModal, setOpenAddVibrationModal] = useState(false);
  const [openAddBetriebsstundenModal, setOpenAddBetriebsstundenModal] = useState(false);

  useEffect(() => {
    const fetchAAS = async () => {
      if (aasId) {
        const response = await getAAS(aasId as string);
        if (response) {
          setAas(response);
        }
      }
    }

    fetchAAS();
  }, [aasId]);

  const getSubmodels = () => {
    if (aas?.submodels) {
      return aas.submodels.map((submodel: any, index: number) => (
        <Box key={index}>
          <Text>{submodel.idShort}</Text>
        </Box>
      ));
    } else {
      return (
        <Stack spaceAfter='small'>
          <Text>Das AAS hat noch keine Submodelle für unseren use case werden drei verschiedene Submodelle benötigt, um Temperatur, Vibration und Betriebsstunden zu erfassen</Text>
          <Text>Um das zu erreichen kann man entweder ein Submodell selber erstellen oder nach Fertigen Submodel Templates suchen</Text>
          <Text>Aktuell ist es hier nicht möglich Submodel Templates zu importieren daher müssen diese Angelegt werden. Um das aber zu erleichtern wird ein eigens erstelltes Template als vorlage dienen welches noch ausgefüllt werden muss</Text>
          <Box>
            <Stack direction='row' spacing='small'>
              <Button onClick={() => setOpenAddTemperaturModal(true)}>Submodell für Temperatur</Button>
              <Button onClick={() => setOpenAddVibrationModal(true)}>Submodell für Vibration </Button>
              <Button onClick={() => setOpenAddBetriebsstundenModal(true)}>Submodell für Betriebsstunden </Button>
            </Stack>
          </Box>
        </Stack>
      )
    }
  }

  return (
    <Background color={defaultTheme.orbit.paletteCloudLight}>
      <Layout type="MMB">
        <Box margin={{ top: 'XXXLarge' }}>
          <Stack direction='column' spacing='medium'>
            <Heading type='title1'>
              Verwaltungsschale: {aas?.idShort}
            </Heading>
          </Stack>
          <Box margin={{ top: 'XLarge' }}>
            <Stack spaceAfter='small'>
              <Text>Model Type: {aas?.modelType}</Text>
              <Text>Id: {aas?.id}</Text>
              <Text>Id short: {aas?.idShort}</Text>
              <Text>_________________________________________________________</Text>
              <Box margin={{ top: 'XLarge' }}>
                <Stack>
                  <Text>Sup modells:</Text>
                  {getSubmodels()}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Layout>
      {openAddTemperaturModal && (
        <AddTemperatur
          onClose={() => setOpenAddTemperaturModal(false)}
          aasId={aasId as string}
          aas={aas}
        />
      )}
      {openAddVibrationModal && (
        <AddVibration
          onClose={() => setOpenAddVibrationModal(false)}
          aasId={aasId as string}
          aas={aas}
        />
      )}
      {openAddBetriebsstundenModal && (
        <AddHours
          onClose={() => setOpenAddBetriebsstundenModal(false)}
          aasId={aasId as string}
          aas={aas}
        />
      )}

    </Background>
  )
}

export default Aas;
