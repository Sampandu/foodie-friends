import Radar from 'radar-sdk-js';
import uuidv4 from 'uuid/v4'

const key = 'prj_test_pk_439a3fadf4d97af57eb227f0b038967971153bc0';

const userId = uuidv4()

Radar.initialize(key);
Radar.setPlacesProvider(Radar.PLACES_PROVIDER.FACEBOOK);
Radar.setUserId(userId);

export default  Radar