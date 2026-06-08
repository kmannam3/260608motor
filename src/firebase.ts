import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp, 
  doc, 
  getDocFromServer,
  query,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test connection as mandated by skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// LocalStorage Mock/Bypass Helper
export function isLocalMode(): boolean {
  return localStorage.getItem('admin_simulation_active') === 'true';
}

function getLocalCollection(collectionName: string): any[] {
  try {
    const raw = localStorage.getItem(`fs_mock_${collectionName}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.map((item: any) => ({
        ...item,
        createdAt: item.createdAt ? new Date(item.createdAt) : new Date()
      }));
    }
  } catch (e) {
    console.error(e);
  }
  
  // Return seed data on first load
  const seeds = getSeedData(collectionName);
  saveToLocalCollection(collectionName, seeds);
  return seeds;
}

function saveToLocalCollection(collectionName: string, list: any[]) {
  try {
    localStorage.setItem(`fs_mock_${collectionName}`, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

function getSeedData(collectionName: string): any[] {
  const now = new Date();
  if (collectionName === 'users') {
    return [
      { id: 'usr_1', uid: 'usr_1', email: 'kmannam3@gmail.com', displayName: '김관리 (Master)', status: 'active', createdAt: new Date(now.getTime() - 86400000 * 5) },
      { id: 'usr_2', uid: 'usr_2', email: 'client2502@motor-test.com', displayName: '경인공업사', status: 'active', createdAt: new Date(now.getTime() - 86400000 * 2) },
      { id: 'usr_3', uid: 'usr_3', email: 'vessel900@marine-tech.com', displayName: '마린테크 수석설계원', status: 'suspended', createdAt: new Date(now.getTime() - 86400000 * 1) }
    ];
  }
  if (collectionName === 'consultations') {
    return [
      { id: 'c_1', name: '김태석 부장', contact: '010-8761-0012', specs: '인덱스 링 서보모터 고압 240V, 토크 45Nm급 커스텀 외경 축소 설계 의뢰 가능 여부 상담 희망', consent: true, status: 'pending', notes: '내일 오전 유선 컨택 예정', createdAt: new Date(now.getTime() - 3600000 * 3) },
      { id: 'c_2', name: '이지훈 책임연구원', contact: '02-8821-4450', specs: 'HSM 고강도 모터 상세 카탈로그 전집 및 CAD 도면 설계 파일 팩 수취 희망합니다.', consent: true, status: 'completed', notes: '메일로 설계 카탈로그 전집 전달 완료', createdAt: new Date(now.getTime() - 3600000 * 8) }
    ];
  }
  if (collectionName === 'posts') {
    return [
      { id: 'p_1', title: '[공지] 하이토크 동기 전동기 HSM 시리즈 국문 카탈로그 배포', content: '<h3>신제품 HSM 시리즈 출시</h3><p>모터 사의 자랑스러운 최신예 초고자력 브러시리스 수냉식 동기 모터 HSM 시리즈의 상세 치수 및 결선 스펙 카탈로그 국문 번역 버전이 출시되었습니다. 고객사 자료실에서 다운로드 가능합니다.</p>', author: '기술영업본부', createdAt: new Date(now.getTime() - 86400000 * 4) },
      { id: 'p_2', title: '[안내] 2026 하절기 생산시설 특별 안전 교육 진행 및 배송 지연 공시', content: '<p>모터 사의 서울 생산단지 전직원 안전 수칙 보강 훈련으로 인해 6월 12일 하루 생산이 일시 조정됩니다. 긴급 납기가 필요한 고객사께서는 영업 담당자와 사전 조율하시기 바랍니다.</p>', author: '본사 지원부', createdAt: new Date(now.getTime() - 86400000 * 9) }
    ];
  }
  if (collectionName === 'banners') {
    return [
      { id: 'b_1', title: '초정량 모터 엔지니어링 브러시리스 동속 가속 구현', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', linkUrl: '#products', isActive: true, createdAt: now }
    ];
  }
  if (collectionName === 'popups') {
    return [
      { id: 'pop_1', title: '영종도 첨단 모터 테스트베드 클라이언트 참관단 초청 캠페인', content: '공식 시연회 일정: 2026년 7월\n모터의 전천후 고압 성능 검증실을 직접 투어하며 소음, 방진, 방수 등급을 체험하실 참관 희망자를 접수받습니다. 본 카탈로그 요청 서식을 통해 견제 신청 시 우대 배정됩니다.', imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80', isActive: true, createdAt: now }
    ];
  }
  return [];
}

// Check if user is Super Admin
export function isSuperAdmin(user: FirebaseUser | null): boolean {
  if (isLocalMode()) return true;
  if (!user) return false;
  return user.email === 'kmannam3@gmail.com';
}

// 1. Google Authentication Sign In Loop
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save user profile state in Firestore database
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Anonymous User',
        status: 'active', // active OR suspended
        createdAt: serverTimestamp()
      });
    } else {
      const userData = userSnap.data();
      if (userData.status === 'suspended') {
        await signOut(auth);
        throw new Error('This account has been suspended by the administrator.');
      }
    }
    return user;
  } catch (error) {
    console.error('Login Failed:', error);
    throw error;
  }
}

// Check logged in users active status
export async function checkUserStatus(uid: string): Promise<'active' | 'suspended'> {
  if (isLocalMode()) return 'active';
  try {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      return userSnap.data().status as 'active' | 'suspended';
    }
    return 'active';
  } catch {
    return 'active';
  }
}

export async function signOutUser() {
  if (isLocalMode()) {
    localStorage.removeItem('admin_simulation_active');
    return;
  }
  await signOut(auth);
}

// -------------------------------------------------------------
// CONSULTATION API
// -------------------------------------------------------------
export async function submitConsultation(name: string, contact: string, specs: string, consent: boolean) {
  const path = 'consultations';
  if (isLocalMode()) {
    const list = getLocalCollection(path);
    const newId = 'c_local_' + Date.now();
    const newItem = {
      id: newId,
      name,
      contact,
      specs,
      consent,
      status: 'pending',
      notes: '',
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
  try {
    const docRef = await addDoc(collection(db, path), {
      name,
      contact,
      specs,
      consent,
      status: 'pending', // pending, completed
      notes: '',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore error fallback to localStorage:", error);
    const list = getLocalCollection(path);
    const newId = 'c_local_' + Date.now();
    const newItem = {
      id: newId,
      name,
      contact,
      specs,
      consent,
      status: 'pending',
      notes: '',
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
}

export async function getConsultations() {
  const path = 'consultations';
  if (isLocalMode()) {
    return getLocalCollection(path);
  }
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date()
    }));
  } catch (error) {
    console.warn("Firestore list consultations error, falling back to local:", error);
    return getLocalCollection(path);
  }
}

export async function updateConsultationStatus(id: string, status: 'pending' | 'completed', notes?: string) {
  const path = `consultations/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('consultations');
    const updated = list.map(item => item.id === id ? { ...item, status, notes: notes || '' } : item);
    saveToLocalCollection('consultations', updated);
    return;
  }
  try {
    const docRef = doc(db, 'consultations', id);
    await updateDoc(docRef, {
      status,
      notes: notes || '',
    });
  } catch (error) {
    console.warn("Firestore update error, falling back to local:", error);
    const list = getLocalCollection('consultations');
    const updated = list.map(item => item.id === id ? { ...item, status, notes: notes || '' } : item);
    saveToLocalCollection('consultations', updated);
  }
}

export async function deleteConsultation(id: string) {
  const path = `consultations/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('consultations');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('consultations', filtered);
    return;
  }
  try {
    await deleteDoc(doc(db, 'consultations', id));
  } catch (error) {
    console.warn("Firestore delete error, falling back to local:", error);
    const list = getLocalCollection('consultations');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('consultations', filtered);
  }
}

// -------------------------------------------------------------
// USER MANAGEMENT API
// -------------------------------------------------------------
export async function getUsers() {
  const path = 'users';
  if (isLocalMode()) {
    return getLocalCollection(path);
  }
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date()
    }));
  } catch (error) {
    console.warn("Firestore get users error, falling back to local:", error);
    return getLocalCollection(path);
  }
}

export async function updateUserStatus(uid: string, status: 'active' | 'suspended') {
  const path = `users/${uid}`;
  if (isLocalMode()) {
    const list = getLocalCollection('users');
    const updated = list.map(item => item.uid === uid ? { ...item, status } : item);
    saveToLocalCollection('users', updated);
    return;
  }
  try {
    await updateDoc(doc(db, 'users', uid), { status });
  } catch (error) {
    console.warn("Firestore update user error, falling back to local:", error);
    const list = getLocalCollection('users');
    const updated = list.map(item => item.uid === uid ? { ...item, status } : item);
    saveToLocalCollection('users', updated);
  }
}

export async function deleteUser(uid: string) {
  const path = `users/${uid}`;
  if (isLocalMode()) {
    const list = getLocalCollection('users');
    const filtered = list.filter(item => item.uid !== uid);
    saveToLocalCollection('users', filtered);
    return;
  }
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch (error) {
    console.warn("Firestore delete user error, falling back to local:", error);
    const list = getLocalCollection('users');
    const filtered = list.filter(item => item.uid !== uid);
    saveToLocalCollection('users', filtered);
  }
}

// -------------------------------------------------------------
// BULLETIN / POSTS API
// -------------------------------------------------------------
export async function getPosts() {
  const path = 'posts';
  if (isLocalMode()) {
    return getLocalCollection(path);
  }
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date()
    }));
  } catch (error) {
    console.warn("Firestore get posts error, falling back to local:", error);
    return getLocalCollection(path);
  }
}

export async function createPost(title: string, content: string, author: string) {
  const path = 'posts';
  if (isLocalMode()) {
    const list = getLocalCollection(path);
    const newId = 'p_local_' + Date.now();
    const newItem = {
      id: newId,
      title,
      content,
      author,
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
  try {
    const docRef = await addDoc(collection(db, path), {
      title,
      content,
      author,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore create post error, falling back to local:", error);
    const list = getLocalCollection(path);
    const newId = 'p_local_' + Date.now();
    const newItem = {
      id: newId,
      title,
      content,
      author,
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
}

export async function updatePost(id: string, title: string, content: string) {
  const path = `posts/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('posts');
    const updated = list.map(item => item.id === id ? { ...item, title, content } : item);
    saveToLocalCollection('posts', updated);
    return;
  }
  try {
    await updateDoc(doc(db, 'posts', id), {
      title,
      content
    });
  } catch (error) {
    console.warn("Firestore update post error, falling back to local:", error);
    const list = getLocalCollection('posts');
    const updated = list.map(item => item.id === id ? { ...item, title, content } : item);
    saveToLocalCollection('posts', updated);
  }
}

export async function deletePost(id: string) {
  const path = `posts/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('posts');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('posts', filtered);
    return;
  }
  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    console.warn("Firestore delete post error, falling back to local:", error);
    const list = getLocalCollection('posts');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('posts', filtered);
  }
}

// -------------------------------------------------------------
// BANNERS API
// -------------------------------------------------------------
export async function getBanners() {
  const path = 'banners';
  if (isLocalMode()) {
    return getLocalCollection(path);
  }
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date()
    }));
  } catch (error) {
    console.warn("Firestore get banners error, falling back to local:", error);
    return getLocalCollection(path);
  }
}

export async function createBanner(title: string, imageUrl: string, linkUrl?: string, isActive: boolean = true) {
  const path = 'banners';
  if (isLocalMode()) {
    const list = getLocalCollection(path);
    const newId = 'b_local_' + Date.now();
    const newItem = {
      id: newId,
      title,
      imageUrl,
      linkUrl: linkUrl || '',
      isActive,
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
  try {
    const docRef = await addDoc(collection(db, path), {
      title,
      imageUrl,
      linkUrl: linkUrl || '',
      isActive,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore create banner error, falling back to local:", error);
    const list = getLocalCollection(path);
    const newId = 'b_local_' + Date.now();
    const newItem = {
      id: newId,
      title,
      imageUrl,
      linkUrl: linkUrl || '',
      isActive,
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
}

export async function updateBanner(id: string, title: string, imageUrl: string, linkUrl?: string, isActive?: boolean) {
  const path = `banners/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('banners');
    const updated = list.map(item => {
      if (item.id === id) {
        const up: any = { ...item, title, imageUrl };
        if (linkUrl !== undefined) up.linkUrl = linkUrl;
        if (isActive !== undefined) up.isActive = isActive;
        return up;
      }
      return item;
    });
    saveToLocalCollection('banners', updated);
    return;
  }
  try {
    const updateData: any = { title, imageUrl };
    if (linkUrl !== undefined) updateData.linkUrl = linkUrl;
    if (isActive !== undefined) updateData.isActive = isActive;
    await updateDoc(doc(db, 'banners', id), updateData);
  } catch (error) {
    console.warn("Firestore update banner error, falling back to local:", error);
    const list = getLocalCollection('banners');
    const updated = list.map(item => {
      if (item.id === id) {
        const up: any = { ...item, title, imageUrl };
        if (linkUrl !== undefined) up.linkUrl = linkUrl;
        if (isActive !== undefined) up.isActive = isActive;
        return up;
      }
      return item;
    });
    saveToLocalCollection('banners', updated);
  }
}

export async function deleteBanner(id: string) {
  const path = `banners/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('banners');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('banners', filtered);
    return;
  }
  try {
    await deleteDoc(doc(db, 'banners', id));
  } catch (error) {
    console.warn("Firestore delete banner error, falling back to local:", error);
    const list = getLocalCollection('banners');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('banners', filtered);
  }
}

// -------------------------------------------------------------
// POPUPS API
// -------------------------------------------------------------
export async function getPopups() {
  const path = 'popups';
  if (isLocalMode()) {
    return getLocalCollection(path);
  }
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date()
    }));
  } catch (error) {
    console.warn("Firestore get popups error, falling back to local:", error);
    return getLocalCollection(path);
  }
}

export async function createPopup(title: string, content: string, imageUrl?: string, isActive: boolean = true) {
  const path = 'popups';
  if (isLocalMode()) {
    const list = getLocalCollection(path);
    const newId = 'pop_local_' + Date.now();
    const newItem = {
      id: newId,
      title,
      content,
      imageUrl: imageUrl || '',
      isActive,
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
  try {
    const docRef = await addDoc(collection(db, path), {
      title,
      content,
      imageUrl: imageUrl || '',
      isActive,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore create popup error, falling back to local:", error);
    const list = getLocalCollection(path);
    const newId = 'pop_local_' + Date.now();
    const newItem = {
      id: newId,
      title,
      content,
      imageUrl: imageUrl || '',
      isActive,
      createdAt: new Date()
    };
    saveToLocalCollection(path, [newItem, ...list]);
    return newId;
  }
}

export async function updatePopup(id: string, title: string, content: string, imageUrl?: string, isActive?: boolean) {
  const path = `popups/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('popups');
    const updated = list.map(item => {
      if (item.id === id) {
        const up: any = { ...item, title, content };
        if (imageUrl !== undefined) up.imageUrl = imageUrl;
        if (isActive !== undefined) up.isActive = isActive;
        return up;
      }
      return item;
    });
    saveToLocalCollection('popups', updated);
    return;
  }
  try {
    const updateData: any = { title, content };
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (isActive !== undefined) updateData.isActive = isActive;
    await updateDoc(doc(db, 'popups', id), updateData);
  } catch (error) {
    console.warn("Firestore update popup error, falling back to local:", error);
    const list = getLocalCollection('popups');
    const updated = list.map(item => {
      if (item.id === id) {
        const up: any = { ...item, title, content };
        if (imageUrl !== undefined) up.imageUrl = imageUrl;
        if (isActive !== undefined) up.isActive = isActive;
        return up;
      }
      return item;
    });
    saveToLocalCollection('popups', updated);
  }
}

export async function deletePopup(id: string) {
  const path = `popups/${id}`;
  if (isLocalMode()) {
    const list = getLocalCollection('popups');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('popups', filtered);
    return;
  }
  try {
    await deleteDoc(doc(db, 'popups', id));
  } catch (error) {
    console.warn("Firestore delete popup error, falling back to local:", error);
    const list = getLocalCollection('popups');
    const filtered = list.filter(item => item.id !== id);
    saveToLocalCollection('popups', filtered);
  }
}
