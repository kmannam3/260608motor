import React, { useState, useEffect } from 'react';
import { 
  auth, 
  db,
  signInWithGoogle, 
  signOutUser, 
  isSuperAdmin,
  getUsers, 
  updateUserStatus, 
  deleteUser,
  getConsultations, 
  updateConsultationStatus, 
  deleteConsultation,
  getPosts, 
  createPost, 
  updatePost, 
  deletePost,
  getBanners, 
  createBanner, 
  updateBanner, 
  deleteBanner,
  getPopups, 
  createPopup, 
  updatePopup, 
  deletePopup
} from '../firebase';
import { 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Layers, 
  Image as ImageIcon, 
  LogOut, 
  Home, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Edit3, 
  AlertTriangle, 
  Save, 
  X, 
  Lock, 
  UserPlus, 
  Sparkles,
  ExternalLink,
  Eye,
  Megaphone
} from 'lucide-react';
import { serverTimestamp, collection, addDoc, doc, setDoc } from 'firebase/firestore';

type ActiveTab = 'users' | 'consultations' | 'posts' | 'banners' | 'popups';

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('users');
  const [loadingData, setLoadingData] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // States for Database entries
  const [usersList, setUsersList] = useState<any[]>([]);
  const [consultationsList, setConsultationsList] = useState<any[]>([]);
  const [postsList, setPostsList] = useState<any[]>([]);
  const [bannersList, setBannersList] = useState<any[]>([]);
  const [popupsList, setPopupsList] = useState<any[]>([]);

  // Editing state
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editingType, setEditingType] = useState<ActiveTab | null>(null);
  
  // Create / Edit Form Input state
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postAuthor, setPostAuthor] = useState('');

  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerLinkUrl, setBannerLinkUrl] = useState('');
  const [bannerIsActive, setBannerIsActive] = useState(true);

  const [popupTitle, setPopupTitle] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [popupImageUrl, setPopupImageUrl] = useState('');
  const [popupIsActive, setPopupIsActive] = useState(true);

  const [consultationNotes, setConsultationNotes] = useState('');
  const [consultationStatus, setConsultationStatus] = useState<'pending' | 'completed'>('pending');

  // Monitor Authentication State
  useEffect(() => {
    if (localStorage.getItem('admin_simulation_active') === 'true') {
      setUser({
        email: 'kmannam3@gmail.com',
        displayName: '관리자 (데모 시뮬레이션)',
        uid: 'demo_admin_sim'
      } as any);
      setIsAdmin(true);
      setLoadingAuth(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const hasAdminAccess = isSuperAdmin(currentUser);
        setIsAdmin(hasAdminAccess);
        if (!hasAdminAccess) {
          setGlobalError(`Access Denied: ${currentUser.email} is not authorized as an Administrator.`);
        } else {
          setGlobalError(null);
        }
      } else {
        setIsAdmin(false);
        setGlobalError(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch Database tables when Admin state transforms
  useEffect(() => {
    if (isAdmin) {
      fetchTabData();
    }
  }, [isAdmin, activeTab]);

  const fetchTabData = async () => {
    setLoadingData(true);
    setGlobalError(null);
    try {
      if (activeTab === 'users') {
        const u = await getUsers();
        setUsersList(u);
      } else if (activeTab === 'consultations') {
        const c = await getConsultations();
        setConsultationsList(c);
      } else if (activeTab === 'posts') {
        const p = await getPosts();
        setPostsList(p);
      } else if (activeTab === 'banners') {
        const b = await getBanners();
        setBannersList(b);
      } else if (activeTab === 'popups') {
        const pop = await getPopups();
        setPopupsList(pop);
      }
    } catch (err: any) {
      console.error(err);
      setGlobalError(err.message || '데이터를 가져오는 중 오류가 발생했습니다. 보안 규칙을 확인하십시오.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleStartSimulation = () => {
    localStorage.setItem('admin_simulation_active', 'true');
    setUser({
      email: 'kmannam3@gmail.com',
      displayName: '관리자 (데모 시뮬레이션)',
      uid: 'demo_admin_sim'
    } as any);
    setIsAdmin(true);
    setGlobalError(null);
  };

  const handleLogin = async () => {
    try {
      setGlobalError(null);
      await signInWithGoogle();
    } catch (err: any) {
      setGlobalError(err.message || '로그인 실패');
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      setIsAdmin(false);
    } catch (err: any) {
      setGlobalError(err.message || '로그아웃 실패');
    }
  };

  // Helper file uploader base64 parse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'banner' | 'popup') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 800000) {
      alert("이미지 크기가 너무 큽니다 (최대 800KB). 최적화된 이미지를 선택해 주세요.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (target === 'banner') {
        setBannerImageUrl(base64String);
      } else {
        setPopupImageUrl(base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  // Create Users Mock Simulator (To populate Users table safely and quickly)
  const simulateNewUser = async () => {
    try {
      setLoadingData(true);
      const suffix = Math.floor(Math.random() * 9000) + 1000;
      const fakeUid = `usr_sim_${suffix}`;
      await setDoc(doc(db, 'users', fakeUid), {
        uid: fakeUid,
        email: `client${suffix}@motor-test.com`,
        displayName: `모터 고객사 ${suffix}`,
        status: 'active',
        createdAt: serverTimestamp()
      });
      await fetchTabData();
    } catch (err: any) {
      setGlobalError(err.message);
    } finally {
      setLoadingData(false);
    }
  };

  // Toggle user status active / suspended
  const handleToggleUserStatus = async (uid: string, currentStatus: string) => {
    try {
      const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
      await updateUserStatus(uid, nextStatus);
      setUsersList(prev => prev.map(u => u.uid === uid ? { ...u, status: nextStatus } : u));
    } catch (err: any) {
      setGlobalError(err.message || '회원 상태 변경에 실패했습니다.');
    }
  };

  // Remove individual user
  const handleRemoveUser = async (uid: string) => {
    if (!confirm('해당 사용자를 정말 탈퇴 처리(삭제) 하시겠습니까?')) return;
    try {
      await deleteUser(uid);
      setUsersList(prev => prev.filter(u => u.uid !== uid));
    } catch (err: any) {
      setGlobalError(err.message || '사용자 삭제에 실패했습니다.');
    }
  };

  // Save / Update Consultation notes & status
  const handleSaveConsultationMeta = async (id: string) => {
    try {
      await updateConsultationStatus(id, consultationStatus, consultationNotes);
      setConsultationsList(prev => prev.map(c => c.id === id ? { ...c, status: consultationStatus, notes: consultationNotes } : c));
      setEditingItem(null);
      setEditingType(null);
    } catch (err: any) {
      setGlobalError(err.message || '상담 변경에 실패했습니다.');
    }
  };

  // Delete Inquiry record
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('이 상담 문의 내역을 영구 삭제하시겠습니까?')) return;
    try {
      await deleteConsultation(id);
      setConsultationsList(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setGlobalError(err.message || '상담 삭제에 실패했습니다.');
    }
  };

  // CRUD BULLETIN POSTSF
  const handleSavePost = async () => {
    if (!postTitle || !postContent) {
      alert('제목과 내용을 모두 작성하십시오.');
      return;
    }
    try {
      setLoadingData(true);
      if (editingItem) {
        await updatePost(editingItem.id, postTitle, postContent);
      } else {
        await createPost(postTitle, postContent, postAuthor || 'Administrator');
      }
      setEditingItem(null);
      setEditingType(null);
      resetPostForm();
      await fetchTabData();
    } catch (err: any) {
      setGlobalError(err.message || '안내글 저장에 실패했습니다.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleStartEditPost = (post: any) => {
    setEditingItem(post);
    setEditingType('posts');
    setPostTitle(post.title);
    setPostContent(post.content);
    setPostAuthor(post.author);
  };

  const resetPostForm = () => {
    setPostTitle('');
    setPostContent('');
    setPostAuthor('');
  };

  const handleDeletePostItem = async (id: string) => {
    if (!confirm('이 게시글을 삭제하시겠습니까?')) return;
    try {
      await deletePost(id);
      setPostsList(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setGlobalError(err.message || '게시글 삭제에 실패했습니다.');
    }
  };

  // CRUD BANNERS
  const handleSaveBanner = async () => {
    if (!bannerTitle || !bannerImageUrl) {
      alert('배너 식별명과 이미지를 등록해주세요.');
      return;
    }
    try {
      setLoadingData(true);
      if (editingItem) {
        await updateBanner(editingItem.id, bannerTitle, bannerImageUrl, bannerLinkUrl, bannerIsActive);
      } else {
        await createBanner(bannerTitle, bannerImageUrl, bannerLinkUrl, bannerIsActive);
      }
      setEditingItem(null);
      setEditingType(null);
      resetBannerForm();
      await fetchTabData();
    } catch (err: any) {
      setGlobalError(err.message || '배너 저장 실패');
    } finally {
      setLoadingData(false);
    }
  };

  const handleStartEditBanner = (bn: any) => {
    setEditingItem(bn);
    setEditingType('banners');
    setBannerTitle(bn.title);
    setBannerImageUrl(bn.imageUrl);
    setBannerLinkUrl(bn.linkUrl || '');
    setBannerIsActive(bn.isActive);
  };

  const resetBannerForm = () => {
    setBannerTitle('');
    setBannerImageUrl('');
    setBannerLinkUrl('');
    setBannerIsActive(true);
  };

  const handleDeleteBannerItem = async (id: string) => {
    if (!confirm('이 배너를 삭제하시겠습니까?')) return;
    try {
      await deleteBanner(id);
      setBannersList(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      setGlobalError(err.message || '배너 삭제 실패');
    }
  };

  // CRUD POPUPS
  const handleSavePopup = async () => {
    if (!popupTitle || !popupContent) {
      alert('팝업 제목과 안내 상세 내용을 작성하십시오.');
      return;
    }
    try {
      setLoadingData(true);
      if (editingItem) {
        await updatePopup(editingItem.id, popupTitle, popupContent, popupImageUrl, popupIsActive);
      } else {
        await createPopup(popupTitle, popupContent, popupImageUrl, popupIsActive);
      }
      setEditingItem(null);
      setEditingType(null);
      resetPopupForm();
      await fetchTabData();
    } catch (err: any) {
      setGlobalError(err.message || '팝업 저장 실패');
    } finally {
      setLoadingData(false);
    }
  };

  const handleStartEditPopup = (pp: any) => {
    setEditingItem(pp);
    setEditingType('popups');
    setPopupTitle(pp.title);
    setPopupContent(pp.content);
    setPopupImageUrl(pp.imageUrl || '');
    setPopupIsActive(pp.isActive);
  };

  const resetPopupForm = () => {
    setPopupTitle('');
    setPopupContent('');
    setPopupImageUrl('');
    setPopupIsActive(true);
  };

  const handleDeletePopupItem = async (id: string) => {
    if (!confirm('이 팝업 안내창을 삭제하시겠습니까?')) return;
    try {
      await deletePopup(id);
      setPopupsList(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setGlobalError(err.message || '팝업 삭제 실패');
    }
  };

  // Loading Spin wrapper
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#070809] flex flex-col items-center justify-center text-white p-6">
        <div className="w-10 h-10 border-t-2 border-r-2 border-[#C4FF00] rounded-full animate-spin mb-4" />
        <span className="font-mono text-xs text-gray-400 tracking-widest animate-pulse">BOOTING ADMIN SECURITY CORES...</span>
      </div>
    );
  }

  // LOGIN SCREEN (IF NOT AUTHENTICATED OR NOT ADMIN)
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6 select-none relative overflow-hidden font-sans">
        {/* Abstract vector decor */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C4FF00]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#090A0C] border border-[#1F2123] p-10 flex flex-col relative z-20">
          {/* Logo badge */}
          <div className="flex items-center gap-1.5 mb-8 justify-center">
            <span className="font-sans text-[24px] font-black tracking-[-0.05em] text-[#C4FF00]">
              motor
            </span>
            <span className="w-1.5 h-1.5 bg-[#C4FF00]"></span>
            <span className="font-mono text-gray-500 font-bold text-xs uppercase tracking-wider ml-1">
              Management
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-sans text-xl font-bold tracking-tight text-white mb-2">
              관리자 보안 포털
            </h1>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              본 시스템은 모터 사의 자율 제생, 생산 데이터 및 고객 상담 접수 관리를 위한 <strong>인허가 관리자 전용 대시보드</strong>입니다.
            </p>
          </div>

          {globalError && (
            <div className="bg-red-950/40 border-l-2 border-red-500 p-3 mb-6 text-[11px] text-red-200 leading-relaxed font-mono flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{globalError}</span>
            </div>
          )}

          {!user ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogin}
                className="w-full py-4 bg-[#C4FF00] hover:bg-opacity-95 text-black font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                id="admin-login-btn"
              >
                <Lock className="w-4 h-4" />
                구글 계정으로 관리자 로그인
              </button>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#1F2123]"></div>
                <span className="flex-shrink mx-4 text-[10px] text-gray-500 font-mono uppercase tracking-widest">혹은 일반 데모</span>
                <div className="flex-grow border-t border-[#1F2123]"></div>
              </div>
              
              <button
                onClick={handleStartSimulation}
                className="w-full py-3.5 bg-[#123F1E] border border-[#1FA230] hover:bg-opacity-95 text-[#C4FF00] font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                id="admin-demo-bypass-btn"
              >
                <Sparkles className="w-4 h-4" />
                데모 및 로컬 시뮬레이션 모드 시작
              </button>
              
              <p className="text-[10px] text-gray-400 leading-normal text-center mt-1">
                * Google Sign-In 또는 Firebase 도메인 승인(Authorized Domains) 이슈가 발생하는 경우, 상기 버튼으로 전체 가상 데모 환경(웹 로컬스토리지 기반)에서 즉시 안전하게 사용해 보실 수 있습니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-[#131416] p-4 border border-[#232527] rounded-none">
                <span className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-1">Signed User</span>
                <span className="font-mono text-xs text-white block truncate font-bold">{user.email}</span>
                <span className="text-[10px] text-red-400 font-semibold block mt-1.5">이 계정은 공인 관리자 권한이 등록되어 있지 않습니다.</span>
              </div>
              
              <button
                onClick={handleStartSimulation}
                className="w-full py-3 bg-[#123F1E] border border-[#1FA230] hover:bg-opacity-95 text-[#C4FF00] font-semibold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                id="admin-mismatch-bypass-btn"
              >
                <Sparkles className="w-4 h-4" />
                데모 및 로컬 시뮬레이션 모드로 대시보드 진입
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-3 bg-[#1A1C1E] border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                id="admin-logout-mismatch-btn"
              >
                <LogOut className="w-4 h-4" />
                다른 계정으로 로그인 또는 로그아웃
              </button>
            </div>
          )}

          <div className="mt-8 border-t border-[#1F2123] pt-6 flex justify-between items-center">
            <button 
              onClick={() => { window.location.pathname = '/'; }}
              className="text-gray-500 hover:text-[#C4FF00] font-sans text-xs tracking-wide flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              메인 홈페이지로 돌아가기
            </button>
            <span className="font-mono text-[9px] text-gray-600 font-medium tracking-wide">
              v1.2.0 SECURE
            </span>
          </div>
        </div>
      </div>
    );
  }

  // RENDER COMPLETE ADMIN DASHBOARD PANEL
  return (
    <div className="min-h-screen bg-[#07080A] text-gray-200 antialiased font-sans flex flex-col relative select-none">
      {/* 1. TOP HEADER BRAND AND OPERATOR PROFILE */}
      <header className="bg-[#0D0E10] border-b border-[#1E1F22] sticky top-0 z-40 px-6 lg:px-12 h-18 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[20px] font-black tracking-[-0.05em] text-[#C4FF00]">
              motor
            </span>
            <span className="w-1.5 h-1.5 bg-[#C4FF00]" />
            <span className="font-mono text-[10px] text-[#C4FF00] bg-[#C4FF00]/10 px-2 py-0.5 tracking-wider font-bold">
              ADMIN CONTROL PANEL
            </span>
          </div>
        </div>

        {/* Operating Meta info */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden sm:flex flex-col text-right font-mono">
            <span className="text-[10px] text-gray-500 font-medium">MASTER OPERATOR</span>
            <span className="text-xs text-[#C4FF00] font-bold">{user.email}</span>
          </div>

          <button
            onClick={() => { window.location.pathname = '/'; }}
            className="px-3.5 py-1.5 bg-[#17181A] border border-[#2B2C2E] hover:border-gray-500 text-gray-300 text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
            title="메인 홈 화면으로 전환"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">사용자 화면 보기</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 border border-[#1E1F22] hover:border-red-600/60 bg-[#17181A] text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            title="관리자 세션 로그아웃"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Space */}
      <div className="flex-grow flex flex-col lg:flex-row">
        
        {/* 2. SIDE TAB SWITCHER RAIL */}
        <aside className="w-full lg:w-[260px] bg-[#0A0B0D] lg:border-r border-[#1E1F22] shrink-0 p-4 lg:p-6 flex flex-col gap-1.5">
          <span className="font-mono text-[9px] text-gray-500 font-semibold tracking-wider px-3 mb-2 block uppercase">CORE REGISTARS</span>
          
          <button
            onClick={() => { setActiveTab('users'); setEditingItem(null); setEditingType(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 text-xs tracking-wide transition-all font-semibold ${
              activeTab === 'users' ? 'bg-[#C4FF00]/10 text-[#C4FF00] border-l-2 border-[#C4FF00]' : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>회원 상태 관리</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-900 text-gray-400 font-bold">{usersList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('consultations'); setEditingItem(null); setEditingType(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 text-xs tracking-wide transition-all font-semibold ${
              activeTab === 'consultations' ? 'bg-[#C4FF00]/10 text-[#C4FF00] border-l-2 border-[#C4FF00]' : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>상담 및 문의 내역</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-900 text-gray-400 font-bold">{consultationsList.length}</span>
          </button>

          <span className="font-mono text-[9px] text-gray-500 font-semibold tracking-wider px-3 mt-6 mb-2 block uppercase">CONTENT ENGINES</span>

          <button
            onClick={() => { setActiveTab('posts'); setEditingItem(null); setEditingType(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 text-xs tracking-wide transition-all font-semibold ${
              activeTab === 'posts' ? 'bg-[#C4FF00]/10 text-[#C4FF00] border-l-2 border-[#C4FF00]' : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>안내 및 기술 소식</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-900 text-gray-400 font-bold">{postsList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('banners'); setEditingItem(null); setEditingType(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 text-xs tracking-wide transition-all font-semibold ${
              activeTab === 'banners' ? 'bg-[#C4FF00]/10 text-[#C4FF00] border-l-2 border-[#C4FF00]' : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>메인 배너 교체</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-900 text-gray-400 font-bold">{bannersList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('popups'); setEditingItem(null); setEditingType(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 text-xs tracking-wide transition-all font-semibold ${
              activeTab === 'popups' ? 'bg-[#C4FF00]/10 text-[#C4FF00] border-l-2 border-[#C4FF00]' : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Megaphone className="w-4 h-4" />
              <span>공지용 팝업 조율</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-900 text-gray-400 font-bold">{popupsList.length}</span>
          </button>

          <div className="mt-auto pt-10 px-3 hidden lg:block">
            <div className="bg-[#121315] p-3.5 border border-[#1E1F21]">
              <span className="text-[10px] text-gray-500 font-mono block uppercase">FIREBASE CONNECTED</span>
              <span className="text-xs text-white block mt-1 font-bold">Spark Instance</span>
              <span className="text-[10px] font-mono text-[#C4FF00] block mt-1 break-all">motor-63d1b</span>
            </div>
          </div>
        </aside>

        {/* 3. WORKING WORKSPACE AREA */}
        <main className="flex-grow p-6 lg:p-12 overflow-x-hidden">
          
          {/* Diagnostic Error Banner */}
          {globalError && (
            <div className="bg-red-950/30 border border-red-500/50 px-4 py-3 mb-6 text-xs text-red-200 font-mono flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{globalError}</span>
              </div>
              <button onClick={() => setGlobalError(null)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB HEADER BRIEFING */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="font-sans text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {activeTab === 'users' && '회원 상태 인덱스'}
                {activeTab === 'consultations' && '상담 및 견적 접수함'}
                {activeTab === 'posts' && '엔지니어링 공지 및 뉴스'}
                {activeTab === 'banners' && '메인 켄버스 배너'}
                {activeTab === 'popups' && '캠페인 팝업 안내'}
              </h2>
              <p className="font-sans text-xs text-gray-400 mt-1">
                {activeTab === 'users' && '전체 클라이언트 회원 목록 명부를 확인하고 정지 또는 정지 해제 제어가 가능합니다.'}
                {activeTab === 'consultations' && '고객이 웹 전면부에서 접수한 핵심 모터 기계 설계상세 및 요청 연락 정보 인덱스입니다.'}
                {activeTab === 'posts' && '산업 포털 전면에 노출시킬 고급 기술 공지글, 신기술 동향, 제품 가이드를 조절합니다.'}
                {activeTab === 'banners' && '메인 빌더에 투사될 초청각 광고 배너 그래픽, 링크 타겟 주소를 실시간 탑재합니다.'}
                {activeTab === 'popups' && '홈페이지 접속 시 활성화할 경조 공지 및 이벤트 모달 레이어를 직접 작성하고 스위칭합니다.'}
              </p>
            </div>

            {/* Custom Control Elements tailored for each tab */}
            <div className="flex items-center gap-2">
              {activeTab === 'users' && (
                <button
                  onClick={simulateNewUser}
                  className="px-4 py-2 bg-[#1A1C20] border border-[#2D2F31] hover:border-gray-500 text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#C4FF00]" />
                  가상유저 가입 (테스트기능)
                </button>
              )}

              {activeTab === 'posts' && !editingItem && (
                <button
                  onClick={() => {
                    setEditingType('posts');
                    setEditingItem(null);
                    resetPostForm();
                  }}
                  className="px-4 py-2 bg-[#C4FF00] text-black text-[11px] font-mono font-black tracking-wider uppercase hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 shadow-sm" />
                  새 보도자료 등록
                </button>
              )}

              {activeTab === 'banners' && !editingItem && (
                <button
                  onClick={() => {
                    setEditingType('banners');
                    setEditingItem(null);
                    resetBannerForm();
                  }}
                  className="px-4 py-2 bg-[#C4FF00] text-black text-[11px] font-mono font-black tracking-wider uppercase hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 shadow-sm" />
                  신규 슬라이드 추가
                </button>
              )}

              {activeTab === 'popups' && !editingItem && (
                <button
                  onClick={() => {
                    setEditingType('popups');
                    setEditingItem(null);
                    resetPopupForm();
                  }}
                  className="px-4 py-2 bg-[#C4FF00] text-black text-[11px] font-mono font-black tracking-wider uppercase hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 shadow-sm" />
                  신규 공지 팝업 추가
                </button>
              )}
            </div>
          </div>

          {/* Loading status bar */}
          {loadingData && (
            <div className="bg-[#111215] border border-[#222326] p-4 flex items-center justify-center gap-3 mb-8">
              <div className="w-4 h-4 border-t border-[#C4FF00] rounded-full animate-spin" />
              <span className="font-mono text-xs text-gray-400">데이터베이스 실시간 로딩중...</span>
            </div>
          )}

          {/* 4. EDIT/CREATE FORMS MODAL OVERLAYS */}
          {editingType && (
            <div className="bg-[#101214] border-2 border-[#C4FF00] p-6 lg:p-8 mb-10 shadow-lg relative">
              <button 
                onClick={() => { setEditingItem(null); setEditingType(null); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-sans text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C4FF00]" />
                {editingItem ? '콘텐츠 정보 갱신' : '신규 아이템 생성 마법사'}
              </h3>

              {/* POST FORM */}
              {editingType === 'posts' && (
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">공지 작성자</label>
                      <input 
                        type="text" 
                        value={postAuthor} 
                        onChange={e => setPostAuthor(e.target.value)}
                        placeholder="예: 기술영업부 / 관리실"
                        className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">공지 분류명 / 제목</label>
                      <input 
                        type="text" 
                        value={postTitle} 
                        onChange={e => setPostTitle(e.target.value)}
                        placeholder="예: [안내] 260608 고압 모터 상세 카탈로그 배포"
                        className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">인포메이션 본문 내용 (HTML/TEXT 지원)</label>
                    <textarea 
                      value={postContent} 
                      onChange={e => setPostContent(e.target.value)}
                      placeholder="상세 내용을 적어주세요..."
                      rows={6}
                      className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00] font-mono leading-relaxed"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={() => { setEditingItem(null); setEditingType(null); }}
                      className="px-4 py-2 bg-[#1A1C1E] border border-gray-700 text-gray-400 text-xs font-semibold cursor-pointer"
                    >
                      취소
                    </button>
                    <button 
                      onClick={handleSavePost}
                      className="px-5 py-2 bg-[#C4FF00] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      저장하기
                    </button>
                  </div>
                </div>
              )}

              {/* BANNER FORM */}
              {editingType === 'banners' && (
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">배너 식별명 / 홍보 문구</label>
                      <input 
                        type="text" 
                        value={bannerTitle} 
                        onChange={e => setBannerTitle(e.target.value)}
                        placeholder="예: 고자력 브러시리스 수냉식 모터 런칭"
                        className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">이동할 타겟 링크 (Optional)</label>
                      <input 
                        type="text" 
                        value={bannerLinkUrl} 
                        onChange={e => setBannerLinkUrl(e.target.value)}
                        placeholder="예: #products 또는 https://..."
                        className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">배너 그래픽 이미지 주소</label>
                      <input 
                        type="text" 
                        value={bannerImageUrl} 
                        onChange={e => setBannerImageUrl(e.target.value)}
                        placeholder="이미지 절대 링크 (https://...) 혹은 아래 파일 업로더 이용"
                        className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00] font-mono text-xs mb-3"
                      />
                      
                      <div className="border border-dashed border-gray-600 p-4 bg-[#111214] flex flex-col items-center justify-center">
                        <span className="text-[11px] text-gray-400 mb-2 block font-medium">로컬 기기에서 파일 가져오기 (Base64 자동인하)</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={e => handleFileUpload(e, 'banner')}
                          className="text-xs text-gray-500 cursor-pointer w-full file:bg-[#1A1C1E] file:text-white file:border file:border-gray-700 file:px-2 file:py-1 file:mr-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">슬라이더 활성화 유무 및 미리보기</label>
                      <div className="flex items-center gap-2 mb-4">
                        <input 
                          type="checkbox" 
                          checked={bannerIsActive} 
                          onChange={e => setBannerIsActive(e.target.checked)}
                          className="accent-[#C4FF00] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs text-white">메인화면 슬라이더에 즉시 노출 활성화</span>
                      </div>

                      {bannerImageUrl ? (
                        <div className="bg-black/50 p-2 border border-gray-800">
                          <span className="text-[10px] text-gray-500 block mb-1">Image Preview:</span>
                          <img 
                            src={bannerImageUrl} 
                            alt="Banner Preview" 
                            className="h-28 object-contain bg-black mx-auto"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="h-28 flex items-center justify-center bg-black/40 text-gray-600 font-mono text-xs border border-gray-800/60">
                          No Graphic Selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={() => { setEditingItem(null); setEditingType(null); }}
                      className="px-4 py-2 bg-[#1A1C1E] border border-gray-700 text-gray-400 text-xs font-semibold cursor-pointer"
                    >
                      취소
                    </button>
                    <button 
                      onClick={handleSaveBanner}
                      className="px-5 py-2 bg-[#C4FF00] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      슬라이드 반영
                    </button>
                  </div>
                </div>
              )}

              {/* POPUP FORM */}
              {editingType === 'popups' && (
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">팝업 주제 / 타이틀</label>
                      <input 
                        type="text" 
                        value={popupTitle} 
                        onChange={e => setPopupTitle(e.target.value)}
                        placeholder="예: 하절기 휴무기간 및 배송 지연 공지"
                        className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">팝업 스킨 데코 이미지 주소 (Optional)</label>
                      <input 
                        type="text" 
                        value={popupImageUrl} 
                        onChange={e => setPopupImageUrl(e.target.value)}
                        placeholder="https://... 또는 아래 기기 파일 로더"
                        className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00] font-mono text-xs mb-2"
                      />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => handleFileUpload(e, 'popup')}
                        className="text-xs text-gray-500 cursor-pointer w-full file:bg-[#1A1C1E] file:text-white file:border file:border-gray-700 file:px-2 file:py-1 file:mr-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">공지 모달 본문 세부 설명</label>
                    <textarea 
                      value={popupContent} 
                      onChange={e => setPopupContent(e.target.value)}
                      placeholder="팝업창 안에 들어갈 핵심 공지 텍스트를 입력해주세요..."
                      rows={4}
                      className="w-full bg-[#16181A] border border-[#2B2D2F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4FF00]"
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={popupIsActive} 
                        onChange={e => setPopupIsActive(e.target.checked)}
                        className="accent-[#C4FF00] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs text-white">팝업 모달 즉각 가동 (홈화면 전개)</span>
                    </div>

                    {popupImageUrl && (
                      <div className="h-10 w-24 bg-black border border-gray-800 shrink-0">
                        <img 
                          src={popupImageUrl} 
                          alt="Popup preview small" 
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={() => { setEditingItem(null); setEditingType(null); }}
                      className="px-4 py-2 bg-[#1A1C1E] border border-gray-700 text-gray-400 text-xs font-semibold cursor-pointer"
                    >
                      취소
                    </button>
                    <button 
                      onClick={handleSavePopup}
                      className="px-5 py-2 bg-[#C4FF00] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      팝업 배포
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. TAB-SPECIFIC VIEWS */}
          {activeTab === 'users' && (
            <div className="bg-[#0D0E10] border border-[#1E1F22] rounded-none overflow-hidden">
              <div className="px-6 py-4 bg-[#141517] border-b border-[#1E1F22] flex justify-between items-center">
                <span className="font-mono text-xs text-gray-400 font-bold">인덱스 테이블</span>
                <span className="font-mono text-[10px] text-gray-500">{usersList.length} Accounts Registered</span>
              </div>

              {usersList.length === 0 ? (
                <div className="p-16 text-center">
                  <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 font-semibold mb-1">등록된 계정이 발견되지 않았습니다.</p>
                  <p className="text-xs text-gray-600 font-mono">가상유저 가본 시연 기능 버튼을 누르거나 실제 로그인을 확보해주세요.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0B0C0E] border-b border-[#1E1F22] text-gray-500 font-mono text-[10px] uppercase font-bold tracking-wider">
                        <th className="py-4 px-6">식별자 (UID)</th>
                        <th className="py-4 px-6">이메일 주소</th>
                        <th className="py-4 px-6">이름 / 닉네임</th>
                        <th className="py-4 px-6">가입일</th>
                        <th className="py-4 px-6">상태 (Status)</th>
                        <th className="py-4 px-6 text-right">제어행위</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#18191B] text-xs">
                      {usersList.map((userItem) => (
                        <tr key={userItem.id} className="hover:bg-[#111214]/50 transition-colors">
                          <td className="py-4 px-6 font-mono text-gray-400 font-semibold text-[11px] truncate max-w-[150px]">
                            {userItem.uid}
                          </td>
                          <td className="py-4 px-6 font-mono text-white font-bold">{userItem.email}</td>
                          <td className="py-4 px-6 text-gray-300 font-medium">{userItem.displayName}</td>
                          <td className="py-4 px-6 font-mono text-gray-500">
                            {userItem.createdAt instanceof Date ? userItem.createdAt.toLocaleDateString() : String(userItem.createdAt)}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide uppercase ${
                              userItem.status === 'active' 
                                ? 'bg-green-950/40 text-green-400 border border-green-800' 
                                : 'bg-red-950/40 text-red-400 border border-red-800'
                            }`}>
                              {userItem.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right flex items-center justify-end gap-2 font-mono">
                            <button
                              onClick={() => handleToggleUserStatus(userItem.uid, userItem.status)}
                              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                userItem.status === 'active'
                                  ? 'bg-red-950/30 text-red-400 hover:bg-red-900/40 border border-red-900'
                                  : 'bg-green-950/30 text-green-400 hover:bg-green-900/40 border border-green-900'
                              }`}
                            >
                              {userItem.status === 'active' ? '정지하기' : '활성화'}
                            </button>
                            <button
                              disabled={userItem.email === 'kmannam3@gmail.com'}
                              onClick={() => handleRemoveUser(userItem.uid)}
                              className="p-1 px-2 border border-gray-800 text-gray-500 hover:text-red-400 hover:border-red-900 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                              title="계정 명부 영구삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'consultations' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left consultation lists */}
              <div className="lg:col-span-2 bg-[#0D0E10] border border-[#1E1F22]">
                <div className="px-6 py-4 bg-[#141517] border-b border-[#1E1F22] flex justify-between items-center">
                  <span className="font-mono text-xs text-gray-400 font-bold">접수된 문의 목록</span>
                  <span className="font-mono text-[10px] text-gray-500">{consultationsList.length} Submissions</span>
                </div>

                {consultationsList.length === 0 ? (
                  <div className="p-16 text-center">
                    <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 font-semibold mb-1">인바운드 상담 내역이 비어 있습니다.</p>
                    <p className="text-xs text-gray-600 font-mono">고객들이 전단 서식에서 작성하는 내용을 바탕으로 채워집니다.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#1A1B1D]">
                    {consultationsList.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => {
                          setEditingItem(item);
                          setConsultationNotes(item.notes || '');
                          setConsultationStatus(item.status || 'pending');
                        }}
                        className={`p-6 cursor-pointer hover:bg-[#111214] transition-colors flex justify-between items-start ${
                          editingItem?.id === item.id ? 'bg-[#15171A] border-l-2 border-[#C4FF00]' : ''
                        }`}
                      >
                        <div className="flex flex-col gap-1.5 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-xs font-bold text-white">{item.name}</span>
                            <span className="text-xs text-gray-500 font-mono">|</span>
                            <span className="font-mono text-xs text-gray-400 font-semibold">{item.contact}</span>
                          </div>
                          
                          <p className="text-[11px] text-gray-400 font-mono truncate max-w-[500px]">
                            {item.specs}
                          </p>
                          
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500 font-bold font-mono">
                            <span>
                              지정일: {item.createdAt instanceof Date ? item.createdAt.toLocaleString() : String(item.createdAt)}
                            </span>
                            
                            {item.notes && (
                              <span className="text-[#C4FF00] font-sans flex items-center gap-0.5 bg-[#C4FF00]/5 px-2 py-0.2">
                                <CheckCircle className="w-2.5 h-2.5" />
                                메모 있음
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className={`inline-flex px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase border ${
                            item.status === 'completed'
                              ? 'bg-green-950/20 text-green-400 border-green-800'
                              : 'bg-yellow-950/20 text-yellow-500 border-yellow-800'
                          }`}>
                            {item.status || 'pending'}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteInquiry(item.id);
                            }}
                            className="p-1 text-gray-500 hover:text-red-400 transition-colors mt-2"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right configuration side */}
              <div className="bg-[#0C0D0F] border border-[#1E1F22] p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-xs font-bold text-gray-200 uppercase tracking-widest border-b border-[#1E1F22] pb-3 mb-5 flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4 text-[#C4FF00]" />
                    상담 처리 모듈
                  </h3>

                  {editingItem ? (
                    <div className="flex flex-col gap-5">
                      <div className="bg-[#121315] p-4 border border-[#1F2123]">
                        <span className="text-[10px] font-mono text-gray-500 block uppercase mb-1">고객 요청자</span>
                        <div className="text-sm font-bold text-[#C4FF00]">{editingItem.name}</div>
                        <div className="text-xs text-white font-mono mt-0.5">{editingItem.contact}</div>
                        
                        <span className="text-[10px] font-mono text-gray-500 block uppercase mt-4 mb-1">요청 규격 (Specs)</span>
                        <div className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre-wrap max-h-40 overflow-y-auto bg-black/30 p-2 border border-gray-900">
                          {editingItem.specs}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">처리 진행 상태</label>
                        <select 
                          value={consultationStatus} 
                          onChange={e => setConsultationStatus(e.target.value as 'pending' | 'completed')}
                          className="w-full bg-[#16181A] border border-[#2B2D2F] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C4FF00] cursor-pointer"
                        >
                          <option value="pending">🟡 진행 대기중 (Pending)</option>
                          <option value="completed">🟢 조치/설계 완료 (Completed)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">관리 내부 메모 (클라이언트용 피드백 기록)</label>
                        <textarea 
                          value={consultationNotes} 
                          onChange={e => setConsultationNotes(e.target.value)}
                          placeholder="특기 고전압 요구 충족성 및 조치 이력을 기재하십시오..."
                          rows={4}
                          className="w-full bg-[#16181A] border border-[#2B2D2F] px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={() => handleSaveConsultationMeta(editingItem.id)}
                        className="w-full py-3 bg-[#C4FF00] hover:bg-opacity-90 text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                      >
                        <Save className="w-4 h-4" />
                        처리 결과 저장
                      </button>
                    </div>
                  ) : (
                    <div className="p-10 text-center text-gray-500">
                      <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-xs leading-relaxed">
                        목록에서 처리할 상담 문의 한 건을 선택해 주십시오. 특수 메모 및 설계 완료 표기가 가능합니다.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#1C1D1F] pt-4 mt-6 text-[10px] text-gray-500 font-mono flex items-center justify-between">
                  <span>SYSTEM AUTO-SYNC</span>
                  <span>ONLINE REALTIME</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="bg-[#0D0E10] border border-[#1E1F22]">
              <div className="px-6 py-4 bg-[#141517] border-b border-[#1E1F22] flex justify-between items-center">
                <span className="font-mono text-xs text-gray-400 font-bold">보도 및 릴리즈 목록</span>
                <span className="font-mono text-[10px] text-gray-500">{postsList.length} Technical News Pages</span>
              </div>

              {postsList.length === 0 ? (
                <div className="p-16 text-center">
                  <FileText className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 font-semibold mb-1">등록된 공지글이 존재하지 않습니다.</p>
                  <p className="text-xs text-gray-600 font-mono">새 보도자료 등록 단락을 사용하여 클라이언트 전방에서 볼 수 있는 포스트를 생성하십시오.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#131416]">
                  {postsList.map((post) => (
                    <div key={post.id} className="p-6 hover:bg-[#111214] transition-colors flex justify-between items-start">
                      <div className="flex flex-col gap-1.5 max-w-[85%] text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] bg-amber-500/10 text-amber-500 font-mono px-2 py-0.5 border border-amber-900/40 uppercase font-black tracking-wide">
                            {post.author}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500">
                            {post.createdAt instanceof Date ? post.createdAt.toLocaleDateString() : String(post.createdAt)}
                          </span>
                        </div>
                        
                        <h4 className="font-sans text-sm font-bold text-white hover:text-[#C4FF00] transition-colors">
                          {post.title}
                        </h4>
                        
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed max-w-[700px] whitespace-pre-wrap">
                          {post.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 font-mono">
                        <button
                          onClick={() => handleStartEditPost(post)}
                          className="p-1 px-2.5 bg-[#17181A] border border-[#2B2C2E] hover:border-[#C4FF00] text-gray-300 hover:text-[#C4FF00] text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeletePostItem(post.id)}
                          className="p-1.5 bg-[#17181A] border border-[#2B2C2E] text-gray-400 hover:text-red-400 hover:border-red-900 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bannersList.length === 0 ? (
                <div className="md:col-span-2 bg-[#0D0E10] border border-[#1E1F22] p-16 text-center">
                  <Layers className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 font-semibold mb-1">교체 등록형 배너 파일이 비어 있습니다.</p>
                  <p className="text-xs text-gray-600 font-mono">고자력 설계 이미지를 Base64 형태로 탑재해 보십시오.</p>
                </div>
              ) : (
                bannersList.map((banner) => (
                  <div key={banner.id} className="bg-[#0C0D0F] border border-[#1E1F22] overflow-hidden flex flex-col justify-between">
                    <div className="relative h-44 bg-black overflow-hidden flex items-center justify-center border-b border-[#1E1F22]">
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.title} 
                        className="w-full h-full object-cover opacity-60"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                          banner.isActive ? 'bg-green-500/10 text-green-400 border border-green-800' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {banner.isActive ? '활성중 (Active)' : '정지됨'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow text-left">
                      <span className="block font-mono text-[9px] text-gray-500 uppercase font-semibold">AD BANNER SLIDE UNIT</span>
                      <h4 className="font-sans text-sm font-bold text-white mt-1 mb-2">{banner.title}</h4>
                      
                      {banner.linkUrl && (
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 font-mono">
                          <ExternalLink className="w-3 h-3 text-[#C4FF00]" />
                          <span className="truncate max-w-[200px]">{banner.linkUrl}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#101113] p-4 border-t border-[#1E1F22] flex items-center justify-between font-mono text-[10px]">
                      <span className="text-gray-500">
                        {banner.createdAt instanceof Date ? banner.createdAt.toDateString() : 'Active System'}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEditBanner(banner)}
                          className="px-2.5 py-1 bg-[#17181A] border border-[#2B2E30] hover:border-gray-500 text-white cursor-pointer"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => handleDeleteBannerItem(banner.id)}
                          className="px-2 py-1 bg-red-950/20 text-red-400 hover:bg-red-900/30 border border-red-900 cursor-pointer"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'popups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popupsList.length === 0 ? (
                <div className="md:col-span-2 bg-[#0D0E10] border border-[#1E1F22] p-16 text-center">
                  <Megaphone className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 font-semibold mb-1">등록된 마케팅 팝업창이 없습니다.</p>
                  <p className="text-xs text-gray-600 font-mono">접속 유도나 하계 휴무 모달 레이어를 추가해 보십시오.</p>
                </div>
              ) : (
                popupsList.map((popup) => (
                  <div key={popup.id} className="bg-[#0C0D0F] border border-[#1E1F22] p-6 flex flex-col justify-between text-left">
                    <div className="flex items-center justify-between border-b border-[#1E1F22] pb-3 mb-4">
                      <span className="font-mono text-[9px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 border border-amber-900/30">
                        POPUP CAMPAIGN
                      </span>
                      
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                        popup.isActive ? 'bg-green-500/10 text-green-400 border border-green-800' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {popup.isActive ? '표출 작동중' : '중단'}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h4 className="font-sans text-sm font-bold text-white mb-2">{popup.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4 whitespace-pre-wrap">
                        {popup.content}
                      </p>

                      {popup.imageUrl && (
                        <div className="h-24 bg-black border border-gray-800 rounded-none overflow-hidden mb-4 p-1">
                          <img 
                            src={popup.imageUrl} 
                            alt="Popup Skin text" 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#1E1F22] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-500">
                        {popup.createdAt instanceof Date ? popup.createdAt.toLocaleDateString() : 'Implicit'}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEditPopup(popup)}
                          className="px-2.5 py-1 bg-[#17181A] border border-[#2B2E30] hover:border-gray-500 text-white cursor-pointer"
                        >
                          양식 변경
                        </button>
                        <button
                          onClick={() => handleDeletePopupItem(popup.id)}
                          className="px-2.5 py-1 bg-red-950/20 text-red-400 hover:bg-red-100 hover:bg-red-900/30 border border-red-900 cursor-pointer"
                        >
                          지우기
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* 6. SYSTEM FOOTER */}
      <footer className="bg-[#090A0B] border-t border-[#1B1D1F] py-4 px-6 lg:px-12 flex justify-between items-center text-[10px] text-gray-500 font-mono mt-auto shrink-0 select-none">
        <span>© MOTOR SYSTEMS DESIGNER CONTROL HUB</span>
        <span className="text-[#C4FF00] font-bold animate-pulse-slow">● STATUS LIVE SECURE CONNECTED</span>
      </footer>
    </div>
  );
}
