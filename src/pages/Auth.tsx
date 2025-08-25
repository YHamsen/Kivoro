import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  Search, 
  MessageCircle, 
  Eye, 
  EyeOff,
  User,
  Lock,
  Mail
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Auth: React.FC = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de connexion/inscription
    navigate('/trading-live')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Menu className="w-5 h-5 text-gray-400" />
            <h1 className="text-lg font-semibold">Messages</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">MQID</span>
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        {/* État vide des messages */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2d2d2d] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-white font-medium mb-2">Pas de messages</h3>
          <p className="text-gray-400 text-sm">
            Aucun message n'est disponible pour le moment
          </p>
        </div>

        {/* Formulaire d'authentification */}
        <div className="max-w-sm mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                      required={!isLogin}
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-3 pt-4">
              <motion.button
                type="submit"
                className="w-full bg-[#F7931A] hover:bg-[#e67e22] py-3 rounded-lg text-white font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? "SE CONNECTER" : "S'ENREGISTRER"}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full bg-[#2196F3] hover:bg-[#1976D2] py-3 rounded-lg text-white font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? "S'ENREGISTRER" : "SE CONNECTER"}
              </motion.button>
            </div>
          </motion.form>

          {/* Informations additionnelles */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              En vous connectant, vous acceptez nos{' '}
              <span className="text-[#2196F3] cursor-pointer">conditions d'utilisation</span>
              {' '}et notre{' '}
              <span className="text-[#2196F3] cursor-pointer">politique de confidentialité</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation du bas */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 px-2 py-2">
        <div className="flex items-center justify-around">
          {[
            { icon: '⟷', label: 'Trading' },
            { icon: '📊', label: 'Graphiques' },
            { icon: '📈', label: 'Performance' },
            { icon: '💼', label: 'Portefeuille' },
            { icon: '📰', label: 'Actualités' },
            { icon: '💬', label: 'Messages', active: true }
          ].map((item, index) => (
            <motion.button
              key={index}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                item.active ? 'text-[#2196F3]' : 'text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-lg">{item.icon}</div>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Auth
