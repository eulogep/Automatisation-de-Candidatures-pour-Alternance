import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Plus, Eye, Edit, Trash2, Calendar, Building, MapPin, Clock, Target, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import './App.css'

function App() {
  const [candidatures, setCandidatures] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    entreprise: '',
    poste: '',
    localisation: '',
    plateforme: '',
    dateEnvoi: '',
    statut: 'envoyee',
    salaire: '',
    typeContrat: 'alternance',
    notes: '',
    contactRecruteur: '',
    dateRelance: '',
    prochaineSuivi: ''
  })

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem('candidatures')
    if (savedData) {
      setCandidatures(JSON.parse(savedData))
    } else {
      // Données d'exemple
      const exempleData = [
        {
          id: 1,
          entreprise: 'Devoteam France',
          poste: 'Alternance Intelligence Artificielle',
          localisation: 'Levallois-Perret (92)',
          plateforme: 'HelloWork',
          dateEnvoi: '2025-09-23',
          statut: 'envoyee',
          salaire: '486-1801€/mois',
          typeContrat: 'alternance',
          notes: 'ESN spécialisée en IA, équipe R&D, Python requis',
          contactRecruteur: '',
          dateRelance: '2025-10-01',
          prochaineSuivi: '2025-10-01'
        },
        {
          id: 2,
          entreprise: 'The Progress Factory',
          poste: 'Alternant(e) Cybersécurité',
          localisation: 'Lyon',
          plateforme: 'LinkedIn',
          dateEnvoi: '2025-09-22',
          statut: 'relancee',
          salaire: 'Non précisé',
          typeContrat: 'alternance',
          notes: 'Formation Mastère incluse, 24 mois, statut cadre',
          contactRecruteur: 'Thanh Huynh',
          dateRelance: '2025-09-30',
          prochaineSuivi: '2025-10-05'
        }
      ]
      setCandidatures(exempleData)
      localStorage.setItem('candidatures', JSON.stringify(exempleData))
    }
  }, [])

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('candidatures', JSON.stringify(candidatures))
  }, [candidatures])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      setCandidatures(prev => prev.map(c => 
        c.id === editingId ? { ...formData, id: editingId } : c
      ))
      setEditingId(null)
    } else {
      const newCandidature = {
        ...formData,
        id: Date.now()
      }
      setCandidatures(prev => [...prev, newCandidature])
    }
    
    resetForm()
    setIsDialogOpen(false)
  }

  const resetForm = () => {
    setFormData({
      entreprise: '',
      poste: '',
      localisation: '',
      plateforme: '',
      dateEnvoi: '',
      statut: 'envoyee',
      salaire: '',
      typeContrat: 'alternance',
      notes: '',
      contactRecruteur: '',
      dateRelance: '',
      prochaineSuivi: ''
    })
  }

  const handleEdit = (candidature) => {
    setFormData(candidature)
    setEditingId(candidature.id)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setCandidatures(prev => prev.filter(c => c.id !== id))
  }

  const getStatutBadge = (statut) => {
    const variants = {
      'envoyee': { variant: 'secondary', icon: Clock, text: 'Envoyée' },
      'relancee': { variant: 'default', icon: AlertCircle, text: 'Relancée' },
      'entretien': { variant: 'default', icon: Calendar, text: 'Entretien' },
      'acceptee': { variant: 'default', icon: CheckCircle, text: 'Acceptée' },
      'refusee': { variant: 'destructive', icon: XCircle, text: 'Refusée' }
    }
    
    const config = variants[statut] || variants['envoyee']
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    )
  }

  const stats = {
    total: candidatures.length,
    envoyees: candidatures.filter(c => c.statut === 'envoyee').length,
    entretiens: candidatures.filter(c => c.statut === 'entretien').length,
    acceptees: candidatures.filter(c => c.statut === 'acceptee').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Suivi des Candidatures d'Alternance
          </h1>
          <p className="text-gray-600">
            Gérez efficacement vos candidatures pour décrocher l'alternance de vos rêves
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Envoyées</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.envoyees}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Entretiens</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.entretiens}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Acceptées</p>
                  <p className="text-3xl font-bold text-green-600">{stats.acceptees}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Mes Candidatures</h2>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setEditingId(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Candidature
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Modifier la candidature' : 'Nouvelle candidature'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations de votre candidature
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="entreprise">Entreprise *</Label>
                    <Input
                      id="entreprise"
                      value={formData.entreprise}
                      onChange={(e) => setFormData(prev => ({ ...prev, entreprise: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="poste">Poste *</Label>
                    <Input
                      id="poste"
                      value={formData.poste}
                      onChange={(e) => setFormData(prev => ({ ...prev, poste: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="localisation">Localisation</Label>
                    <Input
                      id="localisation"
                      value={formData.localisation}
                      onChange={(e) => setFormData(prev => ({ ...prev, localisation: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="plateforme">Plateforme</Label>
                    <Select value={formData.plateforme} onValueChange={(value) => setFormData(prev => ({ ...prev, plateforme: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="indeed">Indeed</SelectItem>
                        <SelectItem value="hellowork">HelloWork</SelectItem>
                        <SelectItem value="welcometothejungle">Welcome to the Jungle</SelectItem>
                        <SelectItem value="apec">APEC</SelectItem>
                        <SelectItem value="site-entreprise">Site entreprise</SelectItem>
                        <SelectItem value="candidature-spontanee">Candidature spontanée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateEnvoi">Date d'envoi *</Label>
                    <Input
                      id="dateEnvoi"
                      type="date"
                      value={formData.dateEnvoi}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateEnvoi: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="statut">Statut</Label>
                    <Select value={formData.statut} onValueChange={(value) => setFormData(prev => ({ ...prev, statut: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="envoyee">Envoyée</SelectItem>
                        <SelectItem value="relancee">Relancée</SelectItem>
                        <SelectItem value="entretien">Entretien programmé</SelectItem>
                        <SelectItem value="acceptee">Acceptée</SelectItem>
                        <SelectItem value="refusee">Refusée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salaire">Salaire</Label>
                    <Input
                      id="salaire"
                      value={formData.salaire}
                      onChange={(e) => setFormData(prev => ({ ...prev, salaire: e.target.value }))}
                      placeholder="ex: 800-1200€/mois"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactRecruteur">Contact recruteur</Label>
                    <Input
                      id="contactRecruteur"
                      value={formData.contactRecruteur}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactRecruteur: e.target.value }))}
                      placeholder="Nom du recruteur"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateRelance">Date de relance</Label>
                    <Input
                      id="dateRelance"
                      type="date"
                      value={formData.dateRelance}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateRelance: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="prochaineSuivi">Prochain suivi</Label>
                    <Input
                      id="prochaineSuivi"
                      type="date"
                      value={formData.prochaineSuivi}
                      onChange={(e) => setFormData(prev => ({ ...prev, prochaineSuivi: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Informations importantes, compétences requises, impressions..."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingId ? 'Modifier' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tableau des candidatures */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Poste</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Date envoi</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prochain suivi</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidatures.map((candidature) => (
                  <TableRow key={candidature.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        {candidature.entreprise}
                      </div>
                    </TableCell>
                    <TableCell>{candidature.poste}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {candidature.localisation}
                      </div>
                    </TableCell>
                    <TableCell>{candidature.dateEnvoi}</TableCell>
                    <TableCell>{getStatutBadge(candidature.statut)}</TableCell>
                    <TableCell>{candidature.prochaineSuivi || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(candidature)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(candidature.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {candidatures.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune candidature pour le moment
                </h3>
                <p className="text-gray-500 mb-4">
                  Commencez par ajouter votre première candidature
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une candidature
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
