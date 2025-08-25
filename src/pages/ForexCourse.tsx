import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  Star, 
  Trophy, 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Award,
  TrendingUp,
  BarChart3,
  DollarSign,
  Search,
  Filter,
  Download,
  Share
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface CourseModule {
  id: string
  title: string
  duration: string
  lessons: number
  completed: boolean
  locked: boolean
  progress: number
  description: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  type: 'video' | 'text' | 'quiz'
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'text' | 'quiz'
  completed: boolean
  locked: boolean
  description: string
}

const ForexCourse: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'progress' | 'certificates'>('overview')
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const courseModules: CourseModule[] = [
    {
      id: '1',
      title: 'Introduction au Forex',
      duration: '2h 30min',
      lessons: 8,
      completed: true,
      locked: false,
      progress: 100,
      description: 'Découvrez les bases du marché des changes et les concepts fondamentaux',
      difficulty: 'Débutant',
      type: 'video'
    },
    {
      id: '2',
      title: 'Analyse Technique',
      duration: '4h 15min',
      lessons: 12,
      completed: true,
      locked: false,
      progress: 100,
      description: 'Maîtrisez les graphiques, indicateurs et patterns de trading',
      difficulty: 'Intermédiaire',
      type: 'video'
    },
    {
      id: '3',
      title: 'Gestion des Risques',
      duration: '3h 45min',
      lessons: 10,
      completed: false,
      locked: false,
      progress: 65,
      description: 'Apprenez à protéger votre capital et gérer vos positions',
      difficulty: 'Intermédiaire',
      type: 'video'
    },
    {
      id: '4',
      title: 'Stratégies Avancées',
      duration: '5h 20min',
      lessons: 15,
      completed: false,
      locked: false,
      progress: 30,
      description: 'Développez des stratégies de trading sophistiquées',
      difficulty: 'Avancé',
      type: 'video'
    },
    {
      id: '5',
      title: 'Trading Algorithmique',
      duration: '6h 10min',
      lessons: 18,
      completed: false,
      locked: true,
      progress: 0,
      description: 'Automatisez vos stratégies avec les robots de trading',
      difficulty: 'Avancé',
      type: 'video'
    }
  ]

  const currentLessons: Lesson[] = [
    {
      id: '1',
      title: 'Qu\'est-ce que le Forex ?',
      duration: '15min',
      type: 'video',
      completed: true,
      locked: false,
      description: 'Introduction générale au marché des changes'
    },
    {
      id: '2',
      title: 'Les Paires de Devises',
      duration: '20min',
      type: 'video',
      completed: true,
      locked: false,
      description: 'Comprendre les paires majeures, mineures et exotiques'
    },
    {
      id: '3',
      title: 'Calcul des Profits',
      duration: '25min',
      type: 'video',
      completed: false,
      locked: false,
      description: 'Apprendre à calculer vos gains et pertes'
    },
    {
      id: '4',
      title: 'Quiz : Concepts de Base',
      duration: '10min',
      type: 'quiz',
      completed: false,
      locked: false,
      description: 'Testez vos connaissances sur les fondamentaux'
    }
  ]

  const achievements = [
    { title: 'Premier Cours Terminé', icon: '🎓', completed: true },
    { title: 'Analyse Technique Maîtrisée', icon: '📊', completed: true },
    { title: 'Expert en Gestion des Risques', icon: '🛡️', completed: false },
    { title: 'Trader Certifié Kivoro', icon: '🏆', completed: false }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-400 bg-green-500/20'
      case 'Intermédiaire': return 'text-yellow-400 bg-yellow-500/20'
      case 'Avancé': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'text': return FileText
      case 'quiz': return BookOpen
      default: return Video
    }
  }

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F7931A] to-[#FFA500] rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">Formation Forex Complète</h2>
            <p className="text-white/80">Devenez un expert du trading Forex</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">20h+</div>
            <div className="text-white/80 text-sm">Contenu</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">65+</div>
            <div className="text-white/80 text-sm">Leçons</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-white text-lg font-bold">4.9★</div>
            <div className="text-white/80 text-sm">Note</div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Votre Progression</h3>
          <span className="text-[#F7931A] font-medium">59% Terminé</span>
        </div>
        
        <div className="w-full h-3 bg-gray-700 rounded-full mb-4">
          <div className="h-full bg-gradient-to-r from-[#F7931A] to-[#FFA500] rounded-full transition-all duration-300" style={{ width: '59%' }} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-300 text-sm">2 modules terminés</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-[#F7931A]" />
            <span className="text-gray-300 text-sm">8h restantes</span>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 cursor-pointer"
          onClick={() => setActiveTab('modules')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Continuer</h4>
              <p className="text-gray-400 text-sm">Gestion des Risques</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 cursor-pointer"
          onClick={() => setActiveTab('certificates')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Certificats</h4>
              <p className="text-gray-400 text-sm">Voir vos réussites</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Lessons */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">Leçons Recommandées</h3>
        <div className="space-y-3">
          {currentLessons.slice(0, 3).map((lesson, index) => {
            const IconComponent = getTypeIcon(lesson.type)
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-[#2d2d2d] rounded-lg cursor-pointer hover:bg-[#3d3d3d] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F7931A]/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-[#F7931A]" />
                  </div>
                  <div>
                    <span className="text-white text-sm font-medium">{lesson.title}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">{lesson.duration}</span>
                      {lesson.completed && <CheckCircle className="w-3 h-3 text-green-400" />}
                    </div>
                  </div>
                </div>
                <Play className="w-4 h-4 text-gray-400" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const ModulesTab = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un module..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#F7931A] focus:outline-none"
          />
        </div>
        <motion.button
          className="p-3 bg-[#2d2d2d] border border-gray-700 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-5 h-5 text-gray-400" />
        </motion.button>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {courseModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 cursor-pointer transition-colors ${
              module.locked ? 'opacity-60' : 'hover:bg-[#2d2d2d]'
            }`}
            onClick={() => !module.locked && setSelectedModule(module)}
            whileHover={!module.locked ? { scale: 1.01 } : {}}
            whileTap={!module.locked ? { scale: 0.99 } : {}}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  module.completed ? 'bg-green-500/20' : module.locked ? 'bg-gray-500/20' : 'bg-[#F7931A]/20'
                }`}>
                  {module.locked ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : module.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <Play className="w-6 h-6 text-[#F7931A]" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{module.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{module.description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-xs">{module.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-xs">{module.lessons} leçons</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                {module.difficulty}
              </span>
            </div>

            {!module.locked && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Progression</span>
                  <span className="text-[#F7931A] text-sm font-medium">{module.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-[#F7931A] to-[#FFA500] rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )

  const ProgressTab = () => (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">Progression Globale</h2>
          <div className="text-white text-3xl font-bold">59%</div>
        </div>
        
        <div className="w-full h-4 bg-white/20 rounded-full mb-4">
          <div className="h-full bg-white/60 rounded-full transition-all duration-300" style={{ width: '59%' }} />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-white text-lg font-bold">32</div>
            <div className="text-white/80 text-sm">Leçons terminées</div>
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-bold">12h</div>
            <div className="text-white/80 text-sm">Temps d'étude</div>
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-bold">87%</div>
            <div className="text-white/80 text-sm">Score moyen</div>
          </div>
        </div>
      </div>

      {/* Learning Streak */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Série d'Apprentissage</h3>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#F7931A] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🔥</span>
            </div>
            <span className="text-[#F7931A] font-medium">7 jours</span>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`h-8 rounded-lg flex items-center justify-center ${
                i < 7 ? 'bg-[#F7931A]' : 'bg-gray-700'
              }`}
            >
              <span className="text-white text-xs font-medium">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Module Progress */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">Progression par Module</h3>
        <div className="space-y-4">
          {courseModules.map((module, index) => (
            <div key={module.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">{module.title}</span>
                <span className="text-gray-400 text-sm">{module.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    module.completed ? 'bg-green-500' : 'bg-gradient-to-r from-[#F7931A] to-[#FFA500]'
                  }`}
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">Réalisations</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${
                achievement.completed 
                  ? 'bg-[#F7931A]/10 border-[#F7931A]/30' 
                  : 'bg-gray-800/50 border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{achievement.icon}</span>
                {achievement.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              <span className={`text-sm font-medium ${
                achievement.completed ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const CertificatesTab = () => (
    <div className="space-y-6">
      {/* Available Certificates */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">Certificats Disponibles</h3>
        
        <div className="space-y-4">
          {[
            { title: 'Fondamentaux du Forex', progress: 100, available: true },
            { title: 'Analyse Technique Certifiée', progress: 100, available: true },
            { title: 'Expert en Gestion des Risques', progress: 65, available: false },
            { title: 'Trader Forex Professionnel', progress: 30, available: false }
          ].map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${
                cert.available 
                  ? 'bg-gradient-to-r from-[#F7931A]/10 to-[#FFA500]/10 border-[#F7931A]/30' 
                  : 'bg-gray-800/30 border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    cert.available ? 'bg-[#F7931A]/20' : 'bg-gray-700'
                  }`}>
                    {cert.available ? (
                      <Award className="w-6 h-6 text-[#F7931A]" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-medium ${cert.available ? 'text-white' : 'text-gray-400'}`}>
                      {cert.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {cert.available ? 'Certificat disponible' : `${cert.progress}% requis`}
                    </p>
                  </div>
                </div>
                
                {cert.available ? (
                  <motion.button
                    className="px-4 py-2 bg-[#F7931A] text-white rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Télécharger
                  </motion.button>
                ) : (
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">{cert.progress}%</div>
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-[#F7931A] rounded-full"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Earned Certificates */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">Mes Certificats</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {[
            { title: 'Fondamentaux du Forex', date: '15 Décembre 2024', id: 'FOREX-001' },
            { title: 'Analyse Technique Certifiée', date: '20 Décembre 2024', id: 'FOREX-002' }
          ].map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#F7931A]/10 to-[#FFA500]/10 border border-[#F7931A]/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-[#F7931A]/20 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-[#F7931A]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{cert.title}</h4>
                    <p className="text-gray-400 text-sm">Obtenu le {cert.date}</p>
                    <p className="text-gray-500 text-xs">ID: {cert.id}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    className="p-2 bg-[#2d2d2d] rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share className="w-4 h-4 text-gray-400" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-[#F7931A] rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={withHaptic(() => navigate('/'), 'light')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </motion.button>
          <h1 className="text-lg font-semibold">Formation Forex</h1>
          <div className="w-10" />
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#2d2d2d] rounded-lg p-1 mt-4">
          {[
            { key: 'overview', label: 'Aperçu', icon: BarChart3 },
            { key: 'modules', label: 'Modules', icon: BookOpen },
            { key: 'progress', label: 'Progrès', icon: TrendingUp },
            { key: 'certificates', label: 'Certificats', icon: Award }
          ].map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-[#F7931A] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(key as typeof activeTab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'modules' && <ModulesTab />}
            {activeTab === 'progress' && <ProgressTab />}
            {activeTab === 'certificates' && <CertificatesTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ForexCourse
