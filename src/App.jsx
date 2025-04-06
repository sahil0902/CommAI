import './App.css'
import Chat from '@/components/Chat'
import EmailWriter from '@/components/EmailWriter'
import { EmailProvider } from '@/components/EmailWriter/EmailContext'
import Footer from './assets/footer'
import 'regenerator-runtime/runtime';
import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [activeComponent, setActiveComponent] = useState('email'); // 'email' or 'chat'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => setActiveComponent('email')}
            variant={activeComponent === 'email' ? 'default' : 'outline'}
          >
            Email Writer
          </Button>
          <Button
            onClick={() => setActiveComponent('chat')}
            variant={activeComponent === 'chat' ? 'default' : 'outline'}
          >
            Chat
          </Button>
        </div>

        <EmailProvider>
          {activeComponent === 'email' ? <EmailWriter /> : <Chat />}
        </EmailProvider>
      </div>
      <Footer />
    </div>
  )
}

export default App
